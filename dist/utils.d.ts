export declare class TrackingUtils {
    static setCookie(name: string, value: string, days?: number, domain?: string): string | undefined;
    static getCookie(name: string): string | undefined;
    static generateId(): string;
    static isValidProtocol(): boolean;
    static isDisabled(): boolean;
}
export declare class ActivityTracker {
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
