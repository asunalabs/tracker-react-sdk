import { TrackingData, EventType } from './types';
export declare function useTracking(): {
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
    config: import("./types").TrackingConfig;
};
