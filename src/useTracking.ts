import { useEffect, useState, useCallback } from "react";
import { EngageTracker } from "./EngageTracker";
import {
	EngageTrackConfig,
	EventType,
	TrackingData,
	SessionData,
	OnlineUsersData,
	ReferralData,
	EngageTrackHooks,
} from "./types";

export interface UseEngageTrackReturn {
	track: (eventType: EventType, data?: TrackingData) => void;
	trackReferralConversion: (data?: TrackingData) => void;
	sessionData: SessionData | null;
	onlineUsers: OnlineUsersData | null;
	isConnected: boolean;
	isInitialized: boolean;
	reconnect: () => void;
	getSessionData: () => SessionData | null;
	getReferralData: () => ReferralData | null;
}

export function useEngageTrack(
	config: EngageTrackConfig,
	hooks: EngageTrackHooks = {}
): UseEngageTrackReturn {
	const [tracker, setTracker] = useState<EngageTracker | null>(null);
	const [isInitialized, setIsInitialized] = useState(false);
	const [sessionData, setSessionData] = useState<SessionData | null>(null);
	const [onlineUsers, setOnlineUsers] = useState<OnlineUsersData | null>(null);
	const [isConnected, setIsConnected] = useState(false);

	useEffect(() => {
		if (typeof window === "undefined") return;

		const trackerHooks: EngageTrackHooks = {
			...hooks,
			onSessionStart: (session) => {
				setSessionData(session);
				hooks.onSessionStart?.(session);
			},
			onSessionEnd: (session) => {
				setSessionData(null);
				hooks.onSessionEnd?.(session);
			},
			onWebSocketConnect: () => {
				setIsConnected(true);
				hooks.onWebSocketConnect?.();
			},
			onWebSocketDisconnect: () => {
				setIsConnected(false);
				hooks.onWebSocketDisconnect?.();
			},
			onOnlineUsersUpdate: (users) => {
				setOnlineUsers(users);
				hooks.onOnlineUsersUpdate?.(users);
			},
		};

		try {
			const trackerInstance = new EngageTracker(config, trackerHooks);
			setTracker(trackerInstance);
			setIsInitialized(true);
		} catch (error) {
			console.error("Failed to initialize EngageTracker:", error);
			hooks.onError?.(error as Error);
		}

		return () => {
			if (tracker) {
				tracker.destroy();
			}
		};
	}, [config.siteId, config.domain]); // Only re-initialize if core config changes

	const track = useCallback(
		(eventType: EventType, data?: TrackingData) => {
			if (tracker) {
				tracker.track(eventType, data);
			}
		},
		[tracker]
	);

	const trackReferralConversion = useCallback(
		(data?: TrackingData) => {
			if (tracker) {
				tracker.trackReferralConversion(data);
			}
		},
		[tracker]
	);

	const getSessionData = useCallback(() => {
		return tracker?.getSessionData() || null;
	}, [tracker]);

	const getReferralData = useCallback(() => {
		return tracker?.getReferralData() || null;
	}, [tracker]);

	const reconnect = useCallback(() => {
		if (tracker) {
			tracker.reconnect();
		}
	}, [tracker]);

	return {
		track,
		trackReferralConversion,
		sessionData,
		onlineUsers,
		isConnected,
		isInitialized,
		reconnect,
		getSessionData,
		getReferralData,
	};
}

// Hook for tracking page views automatically
export function usePageView(path?: string): void {
	const [currentPath, setCurrentPath] = useState<string>("");

	useEffect(() => {
		if (typeof window === "undefined") return;

		const pathname = path || window.location.pathname;

		if (pathname !== currentPath) {
			setCurrentPath(pathname);
			// Note: This requires the tracker to be initialized elsewhere
			// You would typically use this with the main useEngageTrack hook
		}
	}, [path, currentPath]);
}

// Hook for tracking custom events with automatic cleanup
export function useTrackEvent(
	eventType: EventType,
	data?: TrackingData,
	dependencies: any[] = []
): void {
	useEffect(() => {
		// This would need to be used within a component that has access to the tracker
		// Implementation would depend on how the tracker is provided (context or props)
	}, dependencies);
}

// Hook for online users with real-time updates
export function useOnlineUsers(): OnlineUsersData | null {
	const [onlineUsers, setOnlineUsers] = useState<OnlineUsersData | null>(null);

	useEffect(() => {
		// This would connect to the WebSocket for real-time updates
		// Implementation depends on the tracker being available
	}, []);

	return onlineUsers;
}

// Hook for session data with automatic updates
export function useSessionData(): SessionData | null {
	const [sessionData, setSessionData] = useState<SessionData | null>(null);

	useEffect(() => {
		// This would connect to the tracker for session updates
		// Implementation depends on the tracker being available
	}, []);

	return sessionData;
}
