import { ReactNode } from 'react';
import { TrackingConfig, TrackingData, EventType } from './types';
interface TrackerProviderProps {
    children: ReactNode;
    siteId: string;
    domain?: string;
    serverUrl?: string;
    disabled?: boolean;
    autoTrack?: boolean;
}
export declare function TrackerProvider({ children, siteId, domain, serverUrl, disabled, autoTrack }: TrackerProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function useTrack(): {
    track: (eventType: EventType, data?: TrackingData) => void;
    isInitialized: boolean;
    sessionId: string | null;
    userId: string | null;
    config: TrackingConfig;
};
export {};
