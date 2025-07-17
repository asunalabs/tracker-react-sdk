import {
	EngageTrackConfig,
	EventType,
	EventData,
	TrackingData,
	SessionData,
	ReferralData,
	WebSocketMessage,
	OnlineUsersData,
	EngageTrackHooks,
} from "./types";
import {
	DEFAULT_CONFIG,
	generateId,
	setCookie,
	getCookie,
	getReferralData,
	SESSION_COOKIE_NAME,
	USER_COOKIE_NAME,
	debounce,
	throttle,
} from "./utils";

export class EngageTracker {
	private config: EngageTrackConfig;
	private hooks: EngageTrackHooks;
	private sessionData: SessionData | null = null;
	private ws: WebSocket | null = null;
	private heartbeatInterval: number | null = null;
	private activityInterval: number | null = null;
	private reconnectAttempts = 0;
	private onlineUsers: OnlineUsersData | null = null;
	private isInitialized = false;

	constructor(config: EngageTrackConfig, hooks: EngageTrackHooks = {}) {
		this.config = { ...DEFAULT_CONFIG, ...config };
		this.hooks = hooks;

		if (!this.config.siteId) {
			throw new Error("Site ID is required");
		}

		if (!this.config.domain) {
			throw new Error("Domain is required");
		}

		this.init();
	}

	private init(): void {
		if (typeof window === "undefined") {
			console.warn("EngageTracker: Window is not available, tracking disabled");
			return;
		}

		try {
			this.initializeSession();
			this.setupEventListeners();

			if (this.config.enableWebSocket) {
				this.connectWebSocket();
			}

			if (this.config.enableAutoTracking) {
				this.startAutoTracking();
			}

			this.isInitialized = true;
			this.track("session_start");

			if (this.config.enableReferralTracking) {
				this.trackReferral();
			}
		} catch (error) {
			this.handleError(error as Error);
		}
	}

	private initializeSession(): void {
		const sessionId =
			getCookie(SESSION_COOKIE_NAME) ||
			setCookie(
				SESSION_COOKIE_NAME,
				generateId(),
				1 / 48,
				this.config.cookieDomain
			); // 30 minutes
		const userId =
			getCookie(USER_COOKIE_NAME) ||
			setCookie(
				USER_COOKIE_NAME,
				generateId(),
				this.config.cookieExpiry,
				this.config.cookieDomain
			);

		this.sessionData = {
			sessionId: sessionId || generateId(),
			userId: userId || generateId(),
			startTime: Date.now(),
			lastActivity: Date.now(),
			isActive: true,
			timeSpent: 0,
		};

		this.hooks.onSessionStart?.(this.sessionData);
	}

	private setupEventListeners(): void {
		if (typeof window === "undefined") return;

		// Activity tracking
		const updateActivity = throttle(() => {
			if (this.sessionData) {
				this.sessionData.lastActivity = Date.now();
				this.sessionData.timeSpent = Date.now() - this.sessionData.startTime;
			}
		}, 1000);

		["mousemove", "keydown", "scroll", "click", "touchstart"].forEach(
			(event) => {
				document.addEventListener(event, updateActivity, { passive: true });
			}
		);

		// Page visibility
		document.addEventListener("visibilitychange", () => {
			if (document.hidden) {
				this.track("page_hidden", { timeSpent: this.getTimeSpent() });
				this.stopActivityTracking();
			} else {
				this.startActivityTracking();
			}
		});

		// Link click tracking
		document.addEventListener("click", (e) => {
			const target = (e.target as HTMLElement)?.closest("a");
			if (target && target.href) {
				this.trackLinkClick(target, e);
			}
		});

		// Page unload
		window.addEventListener("beforeunload", () => {
			this.track("page_unload", { timeSpent: this.getTimeSpent() });
			this.endSession();
		});

		// Page load
		if (document.readyState === "loading") {
			document.addEventListener("DOMContentLoaded", () => {
				this.track("page_load", { timeSpent: 0 });
				this.track("page_view", {
					url: window.location.href,
					title: document.title,
					timeSpent: 0,
				});
			});
		} else {
			this.track("page_load", { timeSpent: 0 });
			this.track("page_view", {
				url: window.location.href,
				title: document.title,
				timeSpent: 0,
			});
		}
	}

	private startActivityTracking(): void {
		this.stopActivityTracking();

		this.activityInterval = setInterval(() => {
			this.checkActivity();
		}, this.config.checkInterval!) as any;
	}

	private stopActivityTracking(): void {
		if (this.activityInterval) {
			clearInterval(this.activityInterval);
			this.activityInterval = null;
		}
	}

	private checkActivity(): void {
		if (!this.sessionData || typeof window === "undefined") return;

		const currentTime = Date.now();
		const timeSinceLastActivity = currentTime - this.sessionData.lastActivity;

		if (timeSinceLastActivity >= this.config.idleTimeout!) {
			this.track("idle_timeout", { timeSpent: this.getTimeSpent() });
			this.sessionData.isActive = false;
			this.stopActivityTracking();
		}

		this.sessionData.timeSpent = currentTime - this.sessionData.startTime;
	}

	private startAutoTracking(): void {
		this.startActivityTracking();
	}

	private connectWebSocket(): void {
		if (typeof window === "undefined" || !this.config.enableWebSocket) return;

		try {
			const wsUrl =
				this.config.wsUrl ||
				this.config.serverUrl!.replace("/api/track", "").replace("http", "ws") +
					"/ws";

			this.ws = new WebSocket(wsUrl);

			this.ws.onopen = () => {
				this.log("WebSocket connected");
				this.reconnectAttempts = 0;
				this.startHeartbeat();
				this.hooks.onWebSocketConnect?.();
			};

			this.ws.onmessage = (event) => {
				try {
					const message: WebSocketMessage = JSON.parse(event.data);
					this.handleWebSocketMessage(message);
				} catch (error) {
					this.handleError(new Error("Failed to parse WebSocket message"));
				}
			};

			this.ws.onclose = () => {
				this.log("WebSocket connection closed");
				this.stopHeartbeat();
				this.hooks.onWebSocketDisconnect?.();
				this.scheduleReconnect();
			};

			this.ws.onerror = (error) => {
				this.handleError(new Error("WebSocket error"));
			};
		} catch (error) {
			this.handleError(error as Error);
			this.scheduleReconnect();
		}
	}

	private handleWebSocketMessage(message: WebSocketMessage): void {
		this.hooks.onWebSocketMessage?.(message);

		switch (message.type) {
			case "ping":
				this.sendWebSocketMessage({ type: "pong" });
				break;
			case "heartbeat_ack":
				this.log("Heartbeat acknowledged");
				break;
			case "session_end_ack":
				this.log("Session end acknowledged");
				break;
			case "online_users_update":
				this.onlineUsers = message.data;
				this.hooks.onOnlineUsersUpdate?.(message.data);
				break;
		}
	}

	private sendWebSocketMessage(message: WebSocketMessage): void {
		if (this.ws && this.ws.readyState === WebSocket.OPEN) {
			this.ws.send(JSON.stringify(message));
		}
	}

	private startHeartbeat(): void {
		this.stopHeartbeat();

		this.heartbeatInterval = setInterval(() => {
			this.sendHeartbeat();
		}, this.config.heartbeatInterval!) as any;
	}

	private stopHeartbeat(): void {
		if (this.heartbeatInterval) {
			clearInterval(this.heartbeatInterval);
			this.heartbeatInterval = null;
		}
	}

	private sendHeartbeat(): void {
		if (!this.sessionData) return;

		this.sendWebSocketMessage({
			type: "heartbeat",
			siteId: this.config.siteId,
			sessionId: this.sessionData.sessionId,
			userId: this.sessionData.userId,
			timestamp: new Date().toISOString(),
		});
	}

	private scheduleReconnect(): void {
		if (this.reconnectAttempts < this.config.maxReconnectAttempts!) {
			this.reconnectAttempts++;
			const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);

			this.log(
				`Scheduling reconnect attempt ${this.reconnectAttempts}/${this.config.maxReconnectAttempts} in ${delay}ms`
			);

			setTimeout(() => {
				this.connectWebSocket();
			}, delay);
		} else {
			this.log("Max reconnection attempts reached");
		}
	}

	private trackLinkClick(element: HTMLAnchorElement, event: MouseEvent): void {
		const isExternal =
			element.target === "_blank" ||
			element.href.startsWith("mailto:") ||
			element.href.startsWith("tel:") ||
			(element.hostname && element.hostname !== window.location.hostname);

		const data = {
			url: element.href,
			element: element.textContent?.trim() || "Link",
			isExternal,
			timeSpent: this.getTimeSpent(),
		};

		if (isExternal) {
			this.track("user_click", data);
		} else {
			event.preventDefault();
			this.trackWithNavigation("user_click", data, () => {
				window.location.href = element.href;
			});
		}
	}

	private trackWithNavigation(
		eventType: EventType,
		data: EventData,
		navigate: () => void
	): void {
		const payload = this.buildTrackingPayload(eventType, data);

		if (navigator.sendBeacon) {
			const success = navigator.sendBeacon(
				this.config.serverUrl!,
				JSON.stringify(payload)
			);

			if (success) {
				navigate();
				return;
			}
		}

		fetch(this.config.serverUrl!, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
			keepalive: true,
		})
			.then(() => navigate())
			.catch(() => navigate());

		// Fallback timeout
		setTimeout(navigate, 1000);
	}

	private buildTrackingPayload(
		eventType: EventType,
		data: TrackingData = {}
	): any {
		if (!this.sessionData) return null;

		const referralData = getReferralData();

		return {
			siteId: this.config.siteId,
			eventType: eventType.toUpperCase(),
			domain: this.config.domain,
			data: {
				...data,
				sessionId: this.sessionData.sessionId,
				userId: this.sessionData.userId,
				userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
				path: typeof window !== "undefined" ? window.location.pathname : "",
				referer: typeof document !== "undefined" ? document.referrer : null,
				title: typeof document !== "undefined" ? document.title : null,
				referral: referralData,
				timeSpent: this.getTimeSpent(),
			},
			timestamp: new Date().toISOString(),
		};
	}

	private trackReferral(): void {
		const referralData = getReferralData();

		if (referralData) {
			this.track("referral_conversion", {
				referralSource: referralData.source?.source || "direct",
				referralDomain: referralData.source?.domain || null,
				referralUrl: referralData.source?.url || null,
				utmSource: referralData.urlParams?.utm_source || null,
				utmMedium: referralData.urlParams?.utm_medium || null,
				utmCampaign: referralData.urlParams?.utm_campaign || null,
				referralCode:
					referralData.urlParams?.ref ||
					referralData.urlParams?.referral ||
					null,
				landingPage: referralData.landingPage,
				referralTimestamp: referralData.timestamp,
			});

			this.hooks.onReferralConversion?.(referralData);
		}
	}

	private endSession(): void {
		if (!this.sessionData) return;

		this.sessionData.isActive = false;
		this.sessionData.timeSpent = Date.now() - this.sessionData.startTime;

		// Send session end via WebSocket
		this.sendWebSocketMessage({
			type: "session_end",
			siteId: this.config.siteId,
			sessionId: this.sessionData.sessionId,
			userId: this.sessionData.userId,
			timeSpent: Math.floor(this.sessionData.timeSpent / 1000),
			timestamp: new Date().toISOString(),
		});

		// Also send via HTTP as fallback
		this.track("session_end", {
			timeSpent: this.sessionData.timeSpent,
			sessionDuration: Math.floor(this.sessionData.timeSpent / 1000),
		});

		this.hooks.onSessionEnd?.(this.sessionData);
		this.cleanup();
	}

	private cleanup(): void {
		this.stopActivityTracking();
		this.stopHeartbeat();

		if (this.ws) {
			this.ws.close();
			this.ws = null;
		}
	}

	private getTimeSpent(): number {
		return this.sessionData ? Date.now() - this.sessionData.startTime : 0;
	}

	private log(message: string): void {
		if (this.config.debug) {
			console.log(`[EngageTracker] ${message}`);
		}
	}

	private handleError(error: Error): void {
		if (this.config.debug) {
			console.error(`[EngageTracker] Error:`, error);
		}
		this.hooks.onError?.(error);
	}

	// Public API
	public track(eventType: EventType, data: TrackingData = {}): void {
		if (!this.isInitialized) {
			this.log("Tracker not initialized, queuing event");
			setTimeout(() => this.track(eventType, data), 100);
			return;
		}

		const payload = this.buildTrackingPayload(eventType, data);

		if (!payload) {
			this.handleError(new Error("Failed to build tracking payload"));
			return;
		}

		fetch(this.config.serverUrl!, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		}).catch((error) => {
			this.handleError(
				new Error(`Failed to send tracking event: ${error.message}`)
			);
		});

		this.hooks.onTrackingEvent?.(eventType, payload.data);
	}

	public trackReferralConversion(data: TrackingData = {}): void {
		const referralData = getReferralData();

		this.track("referral_conversion_manual", {
			...data,
			referralData,
		});
	}

	public getSessionData(): SessionData | null {
		return this.sessionData;
	}

	public getReferralData(): ReferralData | null {
		return getReferralData();
	}

	public getOnlineUsers(): OnlineUsersData | null {
		return this.onlineUsers;
	}

	public isConnected(): boolean {
		return this.ws?.readyState === WebSocket.OPEN;
	}

	public reconnect(): void {
		this.reconnectAttempts = 0;
		this.connectWebSocket();
	}

	public destroy(): void {
		this.cleanup();
		this.isInitialized = false;
	}
}
