import { ReferralData, ReferralSource } from "./types";

export const DEFAULT_CONFIG = {
	serverUrl: "http://localhost:5000/api/track",
	wsUrl: "ws://localhost:5000/ws",
	idleTimeout: 30000, // 30 seconds
	checkInterval: 1000, // 1 second
	heartbeatInterval: 30000, // 30 seconds
	maxReconnectAttempts: 5,
	enableWebSocket: true,
	enableAutoTracking: true,
	enableReferralTracking: true,
	cookieExpiry: 365, // days
	debug: false,
};

export const REFERRAL_COOKIE_NAME = "engage_referral";
export const SESSION_COOKIE_NAME = "session_id";
export const USER_COOKIE_NAME = "user_id";

export function generateId(): string {
	if (typeof crypto !== "undefined" && crypto.randomUUID) {
		return crypto.randomUUID();
	}
	// Fallback for older browsers
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
		const r = (Math.random() * 16) | 0;
		const v = c === "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

export function setCookie(
	name: string,
	value: string,
	days: number = 365,
	domain?: string
): string {
	const expires = new Date(
		Date.now() + days * 24 * 60 * 60 * 1000
	).toUTCString();
	let cookieString = `${name}=${value}; expires=${expires}; path=/`;

	if (domain && domain.trim() !== "") {
		const hostname =
			typeof window !== "undefined" ? window.location.hostname : "";

		if (
			hostname === "localhost" ||
			hostname === "127.0.0.1" ||
			/^\d+\.\d+\.\d+\.\d+$/.test(hostname)
		) {
			// For localhost/IP, don't set domain attribute
		} else {
			const domainValue = domain.startsWith(".") ? domain : `.${domain}`;
			cookieString += `; domain=${domainValue}`;
		}
	}

	cookieString += "; SameSite=Lax";

	if (typeof document !== "undefined") {
		document.cookie = cookieString;
	}

	return getCookie(name) || value;
}

export function getCookie(name: string): string | undefined {
	if (typeof document === "undefined") return undefined;

	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) {
		return parts.pop()?.split(";").shift();
	}
	return undefined;
}

export function deleteCookie(name: string, domain?: string): void {
	setCookie(name, "", -1, domain);
}

export function parseReferralParams(): Record<string, string> {
	if (typeof window === "undefined") return {};

	const urlParams = new URLSearchParams(window.location.search);
	const hashParams = new URLSearchParams(window.location.hash.substring(1));

	const referralParams = {
		ref: urlParams.get("ref") || hashParams.get("ref"),
		referral: urlParams.get("referral") || hashParams.get("referral"),
		referrer: urlParams.get("referrer") || hashParams.get("referrer"),
		utm_source: urlParams.get("utm_source"),
		utm_medium: urlParams.get("utm_medium"),
		utm_campaign: urlParams.get("utm_campaign"),
		utm_term: urlParams.get("utm_term"),
		utm_content: urlParams.get("utm_content"),
		fbclid: urlParams.get("fbclid"),
		gclid: urlParams.get("gclid"),
		msclkid: urlParams.get("msclkid"),
		source: urlParams.get("source"),
		medium: urlParams.get("medium"),
		campaign: urlParams.get("campaign"),
		affiliate: urlParams.get("affiliate"),
		partner: urlParams.get("partner"),
	};

	return Object.fromEntries(
		Object.entries(referralParams).filter(
			([, value]) => value !== null && value !== undefined
		)
	) as Record<string, string>;
}

export function detectReferralSource(): ReferralSource | null {
	if (typeof document === "undefined") return null;

	const referrer = document.referrer;
	if (!referrer) return null;

	try {
		const referrerUrl = new URL(referrer);
		const referrerDomain = referrerUrl.hostname.toLowerCase();

		const knownSources: Record<string, string> = {
			"google.com": "google",
			"google.co.uk": "google",
			"google.ca": "google",
			"bing.com": "bing",
			"yahoo.com": "yahoo",
			"duckduckgo.com": "duckduckgo",
			"yandex.com": "yandex",
			"baidu.com": "baidu",
			"facebook.com": "facebook",
			"twitter.com": "twitter",
			"x.com": "twitter",
			"linkedin.com": "linkedin",
			"instagram.com": "instagram",
			"tiktok.com": "tiktok",
			"reddit.com": "reddit",
			"pinterest.com": "pinterest",
			"youtube.com": "youtube",
			"github.com": "github",
			"stackoverflow.com": "stackoverflow",
			"medium.com": "medium",
		};

		if (knownSources[referrerDomain]) {
			return {
				source: knownSources[referrerDomain],
				domain: referrerDomain,
				url: referrer,
			};
		}

		for (const [domain, source] of Object.entries(knownSources)) {
			if (referrerDomain.includes(domain)) {
				return {
					source: source,
					domain: referrerDomain,
					url: referrer,
				};
			}
		}

		return {
			source: "None / Direct",
			domain: referrerDomain,
			url: referrer,
		};
	} catch (error) {
		return {
			source: "unknown",
			domain: "unknown",
			url: referrer,
		};
	}
}

export function getReferralData(): ReferralData | null {
	const existingReferral = getCookie(REFERRAL_COOKIE_NAME);
	const urlParams = parseReferralParams();
	const referralSource = detectReferralSource();

	if (Object.keys(urlParams).length > 0) {
		const referralData: ReferralData = {
			timestamp: new Date().toISOString(),
			urlParams: urlParams,
			source: referralSource,
			landingPage: typeof window !== "undefined" ? window.location.href : "",
			userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
		};

		const cookieValue = encodeURIComponent(JSON.stringify(referralData));
		setCookie(REFERRAL_COOKIE_NAME, cookieValue, 30); // 30 days

		return referralData;
	}

	if (existingReferral) {
		try {
			return JSON.parse(decodeURIComponent(existingReferral));
		} catch (error) {
			// Invalid cookie data, ignore
		}
	}

	if (referralSource) {
		const referralData: ReferralData = {
			timestamp: new Date().toISOString(),
			urlParams: {},
			source: referralSource,
			landingPage: typeof window !== "undefined" ? window.location.href : "",
			userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
		};

		const cookieValue = encodeURIComponent(JSON.stringify(referralData));
		setCookie(REFERRAL_COOKIE_NAME, cookieValue, 30); // 30 days

		return referralData;
	}

	return null;
}

export function isLocalStorageAvailable(): boolean {
	try {
		const testKey = "__engagetrack_test__";
		localStorage.setItem(testKey, "test");
		localStorage.removeItem(testKey);
		return true;
	} catch {
		return false;
	}
}

export function debounce<T extends (...args: any[]) => void>(
	func: T,
	wait: number
): (...args: Parameters<T>) => void {
	let timeout: number | null = null;

	return function executedFunction(...args: Parameters<T>) {
		const later = () => {
			timeout = null;
			func(...args);
		};

		if (timeout) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(later, wait) as any;
	};
}

export function throttle<T extends (...args: any[]) => void>(
	func: T,
	limit: number
): (...args: Parameters<T>) => void {
	let inThrottle: boolean;

	return function executedFunction(...args: Parameters<T>) {
		if (!inThrottle) {
			func(...args);
			inThrottle = true;
			setTimeout(() => (inThrottle = false), limit);
		}
	};
}
