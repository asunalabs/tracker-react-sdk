export interface EngageTrackConfig {
    siteId: string;
    domain: string;
    serverUrl?: string;
    wsUrl?: string;
    idleTimeout?: number;
    checkInterval?: number;
    heartbeatInterval?: number;
    maxReconnectAttempts?: number;
    enableWebSocket?: boolean;
    enableAutoTracking?: boolean;
    enableReferralTracking?: boolean;
    cookieDomain?: string;
    cookieExpiry?: number;
    debug?: boolean;
}
export interface TrackingData {
    [key: string]: any;
}
export interface EventData extends TrackingData {
    sessionId?: string;
    userId?: string;
    userAgent?: string;
    path?: string;
    referer?: string;
    title?: string;
    timeSpent?: number;
    timestamp?: string;
}
export interface ReferralData {
    timestamp: string;
    urlParams: Record<string, string>;
    source: ReferralSource | null;
    landingPage: string;
    userAgent: string;
}
export interface ReferralSource {
    source: string;
    domain: string;
    url: string;
}
export interface SessionData {
    sessionId: string;
    userId: string;
    startTime: number;
    lastActivity: number;
    isActive: boolean;
    timeSpent: number;
}
export interface WebSocketMessage {
    type: string;
    data?: any;
    siteId?: string;
    sessionId?: string;
    userId?: string;
    timestamp?: string;
    timeSpent?: number;
    [key: string]: any;
}
export interface OnlineUsersData {
    count: number;
    users: Array<{
        userId: string;
        sessionId: string;
        lastSeen: string;
    }>;
}
export type EventType = "page_view" | "page_load" | "page_unload" | "page_hidden" | "user_click" | "idle_timeout" | "session_start" | "session_end" | "referral_conversion" | "referral_conversion_manual" | "custom_event";
export interface EngageTrackHooks {
    onTrackingEvent?: (eventType: EventType, data: EventData) => void;
    onSessionStart?: (sessionData: SessionData) => void;
    onSessionEnd?: (sessionData: SessionData) => void;
    onWebSocketConnect?: () => void;
    onWebSocketDisconnect?: () => void;
    onWebSocketMessage?: (message: WebSocketMessage) => void;
    onOnlineUsersUpdate?: (data: OnlineUsersData) => void;
    onReferralConversion?: (referralData: ReferralData) => void;
    onError?: (error: Error) => void;
}
export interface EngageTrackContextType {
    config: EngageTrackConfig;
    isInitialized: boolean;
    sessionData: SessionData | null;
    onlineUsers: OnlineUsersData | null;
    track: (eventType: EventType, data?: TrackingData) => void;
    trackReferralConversion: (data?: TrackingData) => void;
    getSessionData: () => SessionData | null;
    getReferralData: () => ReferralData | null;
    isConnected: boolean;
    reconnect: () => void;
}
