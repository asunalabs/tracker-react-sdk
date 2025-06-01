// Types for the tracking data and events
export interface TrackingConfig {
  siteId: string;
  domain?: string;
  serverUrl?: string;
  disabled?: boolean;
}

export interface TrackingData {
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

export interface TrackingPayload {
  siteId: string;
  eventType: string;
  data: TrackingData;
  timestamp: string;
}

export type EventType = 
  | 'page_load'
  | 'page_view'
  | 'page_unload'
  | 'page_hidden'
  | 'user_click'
  | 'idle_timeout'
  | 'custom'
  | string;

export interface TrackingContextValue {
  track: (eventType: EventType, data?: TrackingData) => void;
  config: TrackingConfig;
  isInitialized: boolean;
  sessionId: string | null;
  userId: string | null;
}
