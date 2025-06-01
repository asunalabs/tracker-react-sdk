import React, { createContext, useContext, useEffect, useState, useCallback, useRef, ReactNode } from 'react';
import { TrackingConfig, TrackingContextValue, TrackingData, EventType, TrackingPayload } from './types';
import { TrackingUtils, ActivityTracker } from './utils';

const TrackingContext = createContext<TrackingContextValue | null>(null);

interface TrackerProviderProps {
  children: ReactNode;
  siteId: string;
  domain?: string;
  serverUrl?: string;
  disabled?: boolean;
  autoTrack?: boolean;
}

export function TrackerProvider({
  children,
  siteId,
  domain,
  serverUrl = "http://localhost:5000/api/track",
  disabled = false,
  autoTrack = true
}: TrackerProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const activityTrackerRef = useRef<ActivityTracker | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  const config: TrackingConfig = {
    siteId,
    domain,
    serverUrl,
    disabled
  };

  // Initialize tracking
  useEffect(() => {
    if (disabled || TrackingUtils.isDisabled()) {
      console.warn("EngageTrack is disabled");
      return;
    }

    if (!siteId) {
      console.error("Site ID is required for EngageTrack");
      return;
    }

    if (!TrackingUtils.isValidProtocol()) {
      console.warn("EngageTrack SDK is only supported on HTTP or HTTPS protocols.");
      return;
    }

    // Initialize session and user IDs
    const existingSessionId = TrackingUtils.getCookie("session_id");
    const existingUserId = TrackingUtils.getCookie("user_id");

    const newSessionId = existingSessionId || TrackingUtils.setCookie("session_id", TrackingUtils.generateId(), 1 / 48, domain);
    const newUserId = existingUserId || TrackingUtils.setCookie("user_id", TrackingUtils.generateId(), 365, domain);

    setSessionId(newSessionId || null);
    setUserId(newUserId || null);
    setIsInitialized(true);

    console.log('EngageTrack initialized:', { userId: newUserId, sessionId: newSessionId });
  }, [siteId, domain, disabled]);

  // Send tracking data to server
  const sendTrackingData = useCallback(async (eventType: EventType, data: TrackingData = {}) => {
    if (!isInitialized || disabled || !sessionId || !userId) {
      return;
    }

    const payload: TrackingPayload = {
      siteId,
      eventType: eventType.toUpperCase(),
      data: {
        ...data,
        sessionId,
        userId,
        userAgent: navigator.userAgent,
        path: window.location.pathname,
        referer: document.referrer || undefined,
        title: document.title || undefined,
      },
      timestamp: new Date().toISOString(),
    };

    try {
      await fetch(serverUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error("Error sending tracking data:", error);
    }
  }, [isInitialized, disabled, sessionId, userId, siteId, serverUrl]);

  // Track function
  const track = useCallback((eventType: EventType, data?: TrackingData) => {
    sendTrackingData(eventType, data);
  }, [sendTrackingData]);

  // Auto-tracking setup
  useEffect(() => {
    if (!isInitialized || !autoTrack || disabled) {
      return;
    }

    // Track page load
    track('page_load', { timeSpent: 0 });

    // Track page view
    track('page_view', {
      url: window.location.href,
      title: document.title,
      timeSpent: 0,
    });

    // Setup click tracking
    const handleClick = (event: Event) => {
      const target = event.target as HTMLElement;
      track('user_click', {
        url: window.location.href,
        element: target.tagName || 'unknown',
        timeSpent: Date.now() - startTimeRef.current,
      });
    };

    document.addEventListener('click', handleClick);

    // Setup activity tracking
    const handleIdle = (timeSpent: number) => {
      track('idle_timeout', { timeSpent });
    };

    const handleHidden = (timeSpent: number) => {
      track('page_hidden', { timeSpent });
    };

    activityTrackerRef.current = new ActivityTracker(handleIdle, handleHidden);

    // Setup page unload tracking
    const handleUnload = () => {
      track('page_unload', { timeSpent: Date.now() - startTimeRef.current });
    };

    window.addEventListener('pagehide', handleUnload);

    // Cleanup
    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('pagehide', handleUnload);
      if (activityTrackerRef.current) {
        activityTrackerRef.current.destroy();
      }
    };
  }, [isInitialized, autoTrack, disabled, track]);

  const contextValue: TrackingContextValue = {
    track,
    config,
    isInitialized,
    sessionId,
    userId,
  };

  return (
    <TrackingContext.Provider value={contextValue}>
      {children}
    </TrackingContext.Provider>
  );
}

export function useTrack() {
  const context = useContext(TrackingContext);
  
  if (!context) {
    throw new Error('useTrack must be used within a TrackerProvider');
  }

  return {
    track: context.track,
    isInitialized: context.isInitialized,
    sessionId: context.sessionId,
    userId: context.userId,
    config: context.config,
  };
}
