import { EngageTrackConfig, EventType, TrackingData, SessionData, ReferralData, OnlineUsersData, EngageTrackHooks } from "./types";
export declare class EngageTracker {
    private config;
    private hooks;
    private sessionData;
    private ws;
    private heartbeatInterval;
    private activityInterval;
    private reconnectAttempts;
    private onlineUsers;
    private isInitialized;
    constructor(config: EngageTrackConfig, hooks?: EngageTrackHooks);
    private init;
    private initializeSession;
    private setupEventListeners;
    private startActivityTracking;
    private stopActivityTracking;
    private checkActivity;
    private startAutoTracking;
    private connectWebSocket;
    private handleWebSocketMessage;
    private sendWebSocketMessage;
    private startHeartbeat;
    private stopHeartbeat;
    private sendHeartbeat;
    private scheduleReconnect;
    private trackLinkClick;
    private trackWithNavigation;
    private buildTrackingPayload;
    private trackReferral;
    private endSession;
    private cleanup;
    private getTimeSpent;
    private log;
    private handleError;
    track(eventType: EventType, data?: TrackingData): void;
    trackReferralConversion(data?: TrackingData): void;
    getSessionData(): SessionData | null;
    getReferralData(): ReferralData | null;
    getOnlineUsers(): OnlineUsersData | null;
    isConnected(): boolean;
    reconnect(): void;
    destroy(): void;
}
