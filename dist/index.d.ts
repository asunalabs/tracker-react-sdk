import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';

interface TrackingConfig {
    siteId: string;
    domain?: string;
    serverUrl?: string;
    disabled?: boolean;
}
interface TrackingData {
    [key: string]: any;
    sessionId?: string;
    userId?: string;
    userAgent?: string;
    path?: string;
    referer?: string;
    title?: string;
    timeSpent?: number;
    url?: string;
    element?: string;
}
interface TrackingPayload {
    siteId: string;
    eventType: string;
    data: TrackingData;
    timestamp: string;
}
type EventType = 'page_load' | 'page_view' | 'page_unload' | 'page_hidden' | 'user_click' | 'idle_timeout' | 'custom' | string;
interface TrackingContextValue {
    track: (eventType: EventType, data?: TrackingData) => void;
    config: TrackingConfig;
    isInitialized: boolean;
    sessionId: string | null;
    userId: string | null;
}

interface TrackerProviderProps {
    children: ReactNode;
    siteId: string;
    domain?: string;
    serverUrl?: string;
    disabled?: boolean;
    autoTrack?: boolean;
}
declare function TrackerProvider({ children, siteId, domain, serverUrl, disabled, autoTrack }: TrackerProviderProps): react_jsx_runtime.JSX.Element;
declare function useTrack(): {
    track: (eventType: EventType, data?: TrackingData) => void;
    isInitialized: boolean;
    sessionId: string | null;
    userId: string | null;
    config: TrackingConfig;
};

declare function useTracking(): {
    track: {
        customEvent: (eventName: string, data?: TrackingData) => void;
        pageView: (url?: string, title?: string) => void;
        click: (element?: string, data?: TrackingData) => void;
        formSubmit: (formName: string, data?: TrackingData) => void;
        formStart: (formName: string, data?: TrackingData) => void;
        buttonClick: (buttonName: string, data?: TrackingData) => void;
        search: (query: string, results?: number, data?: TrackingData) => void;
        download: (fileName: string, fileType?: string, data?: TrackingData) => void;
        videoPlay: (videoTitle: string, duration?: number, data?: TrackingData) => void;
        videoPause: (videoTitle: string, currentTime?: number, data?: TrackingData) => void;
        videoComplete: (videoTitle: string, duration?: number, data?: TrackingData) => void;
        purchase: (orderId: string, total: number, currency?: string, data?: TrackingData) => void;
        addToCart: (productId: string, productName: string, price?: number, data?: TrackingData) => void;
        removeFromCart: (productId: string, productName: string, data?: TrackingData) => void;
        event: (eventType: EventType, data?: TrackingData) => void;
    };
    isInitialized: boolean;
    sessionId: string | null;
    userId: string | null;
    config: TrackingConfig;
};

declare class TrackingUtils {
    static setCookie(name: string, value: string, days?: number, domain?: string): string | undefined;
    static getCookie(name: string): string | undefined;
    static generateId(): string;
    static isValidProtocol(): boolean;
    static isDisabled(): boolean;
}
declare class ActivityTracker {
    private startTime;
    private lastActivityTime;
    private intervalId;
    private onIdle;
    private onHidden;
    constructor(onIdle: (timeSpent: number) => void, onHidden: (timeSpent: number) => void);
    private setupEventListeners;
    private checkActivity;
    private startTracking;
    private stop;
    private reset;
    destroy(): void;
    getTimeSpent(): number;
}

export { ActivityTracker, TrackerProvider, TrackingUtils, useTrack, useTracking };
export type { EventType, TrackingConfig, TrackingContextValue, TrackingData, TrackingPayload };
