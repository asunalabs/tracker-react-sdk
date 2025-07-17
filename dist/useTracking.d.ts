import { EngageTrackConfig, EventType, TrackingData, SessionData, OnlineUsersData, ReferralData, EngageTrackHooks } from "./types";
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
export declare function useEngageTrack(config: EngageTrackConfig, hooks?: EngageTrackHooks): UseEngageTrackReturn;
export declare function usePageView(path?: string): void;
export declare function useTrackEvent(eventType: EventType, data?: TrackingData, dependencies?: any[]): void;
export declare function useOnlineUsers(): OnlineUsersData | null;
export declare function useSessionData(): SessionData | null;
