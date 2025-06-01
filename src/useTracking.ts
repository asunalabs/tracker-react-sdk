import { useCallback } from 'react';
import { useTrack } from './TrackerProvider';
import { TrackingData, EventType } from './types';

export function useTracking() {
  const { track: baseTrack, isInitialized, sessionId, userId, config } = useTrack();

  // Enhanced track function with common patterns
  const track = useCallback(() => ({
    // Custom events
    customEvent: (eventName: string, data?: TrackingData) => {
      baseTrack('custom', { eventName, ...data });
    },

    // Page events
    pageView: (url?: string, title?: string) => {
      baseTrack('page_view', {
        url: url || window.location.href,
        title: title || document.title,
        timeSpent: 0,
      });
    },

    // User interaction events
    click: (element?: string, data?: TrackingData) => {
      baseTrack('user_click', {
        element: element || 'unknown',
        url: window.location.href,
        ...data,
      });
    },

    // Form events
    formSubmit: (formName: string, data?: TrackingData) => {
      baseTrack('custom', {
        eventName: 'form_submit',
        formName,
        ...data,
      });
    },

    formStart: (formName: string, data?: TrackingData) => {
      baseTrack('custom', {
        eventName: 'form_start',
        formName,
        ...data,
      });
    },

    // Button events
    buttonClick: (buttonName: string, data?: TrackingData) => {
      baseTrack('custom', {
        eventName: 'button_click',
        buttonName,
        ...data,
      });
    },

    // Search events
    search: (query: string, results?: number, data?: TrackingData) => {
      baseTrack('custom', {
        eventName: 'search',
        query,
        results,
        ...data,
      });
    },

    // Download events
    download: (fileName: string, fileType?: string, data?: TrackingData) => {
      baseTrack('custom', {
        eventName: 'download',
        fileName,
        fileType,
        ...data,
      });
    },

    // Video events
    videoPlay: (videoTitle: string, duration?: number, data?: TrackingData) => {
      baseTrack('custom', {
        eventName: 'video_play',
        videoTitle,
        duration,
        ...data,
      });
    },

    videoPause: (videoTitle: string, currentTime?: number, data?: TrackingData) => {
      baseTrack('custom', {
        eventName: 'video_pause',
        videoTitle,
        currentTime,
        ...data,
      });
    },

    videoComplete: (videoTitle: string, duration?: number, data?: TrackingData) => {
      baseTrack('custom', {
        eventName: 'video_complete',
        videoTitle,
        duration,
        ...data,
      });
    },

    // E-commerce events
    purchase: (orderId: string, total: number, currency?: string, data?: TrackingData) => {
      baseTrack('custom', {
        eventName: 'purchase',
        orderId,
        total,
        currency: currency || 'USD',
        ...data,
      });
    },

    addToCart: (productId: string, productName: string, price?: number, data?: TrackingData) => {
      baseTrack('custom', {
        eventName: 'add_to_cart',
        productId,
        productName,
        price,
        ...data,
      });
    },

    removeFromCart: (productId: string, productName: string, data?: TrackingData) => {
      baseTrack('custom', {
        eventName: 'remove_from_cart',
        productId,
        productName,
        ...data,
      });
    },

    // Generic track function
    event: (eventType: EventType, data?: TrackingData) => {
      baseTrack(eventType, data);
    }
  }), [baseTrack]);

  return {
    track: track(),
    isInitialized,
    sessionId,
    userId,
    config,
  };
}
