// Core classes
export { EngageTracker } from "./EngageTracker";

// React hooks
export {
	useEngageTrack,
	usePageView,
	useTrackEvent,
	useOnlineUsers,
	useSessionData,
} from "./useTracking";
export type { UseEngageTrackReturn } from "./useTracking";

// Types
export type {
	EngageTrackConfig,
	TrackingData,
	EventData,
	ReferralData,
	ReferralSource,
	SessionData,
	WebSocketMessage,
	OnlineUsersData,
	EventType,
	EngageTrackHooks,
	EngageTrackContextType,
} from "./types";

// Utilities
export {
	generateId,
	setCookie,
	getCookie,
	deleteCookie,
	parseReferralParams,
	detectReferralSource,
	getReferralData,
	isLocalStorageAvailable,
	debounce,
	throttle,
	DEFAULT_CONFIG,
	REFERRAL_COOKIE_NAME,
	SESSION_COOKIE_NAME,
	USER_COOKIE_NAME,
} from "./utils";
