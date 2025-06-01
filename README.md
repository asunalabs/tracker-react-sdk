# @engagetrack/react

A React provider and hooks package for EngageTrack analytics that provides a clean, type-safe way to integrate tracking into React applications.

## Installation

```bash
npm install @engagetrack/react
```

## Quick Start

### 1. Wrap your app with TrackerProvider

```tsx
import React from 'react';
import { TrackerProvider } from '@engagetrack/react';

function App() {
  return (
    <TrackerProvider 
      siteId="your-site-id" 
      domain="yourdomain.com"
      serverUrl="https://your-analytics-server.com/api/track"
    >
      <YourAppContent />
    </TrackerProvider>
  );
}
```

### 2. Use tracking in your components

```tsx
import React from 'react';
import { useTracking } from '@engagetrack/react';

function MyComponent() {
  const { track } = useTracking();

  const handleButtonClick = () => {
    track.buttonClick('hero-cta', {
      section: 'homepage',
      campaign: 'summer-sale'
    });
  };

  const handleFormSubmit = (formData) => {
    track.formSubmit('newsletter-signup', {
      email: formData.email,
      source: 'homepage'
    });
  };

  return (
    <div>
      <button onClick={handleButtonClick}>
        Sign Up Now
      </button>
      
      <form onSubmit={handleFormSubmit}>
        {/* form content */}
      </form>
    </div>
  );
}
```

## API Reference

### TrackerProvider Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `siteId` | `string` | ✅ | - | Your unique site identifier |
| `domain` | `string` | ❌ | - | Domain for cookie setting |
| `serverUrl` | `string` | ❌ | `"http://localhost:5000/api/track"` | Analytics server URL |
| `disabled` | `boolean` | ❌ | `false` | Disable tracking entirely |
| `autoTrack` | `boolean` | ❌ | `true` | Enable automatic page view and interaction tracking |

### useTracking Hook

The `useTracking` hook provides convenient methods for common tracking scenarios:

#### Basic Usage

```tsx
const { track, isInitialized, sessionId, userId } = useTracking();
```

#### Available Methods

##### Custom Events
```tsx
track.customEvent('video_watched', { 
  videoId: 'intro-video',
  duration: 120,
  completed: true 
});
```

##### Page Events
```tsx
track.pageView('/custom-page', 'Custom Page Title');
```

##### User Interactions
```tsx
track.click('navigation-menu');
track.buttonClick('subscribe-button', { plan: 'premium' });
```

##### Form Events
```tsx
track.formStart('contact-form');
track.formSubmit('contact-form', { 
  fields: ['name', 'email', 'message'],
  source: 'contact-page' 
});
```

##### Search Events
```tsx
track.search('react hooks', 42, { 
  category: 'documentation',
  filter: 'recent' 
});
```

##### Download Events
```tsx
track.download('user-guide.pdf', 'pdf', { 
  section: 'help-center' 
});
```

##### Video Events
```tsx
track.videoPlay('product-demo', 300);
track.videoPause('product-demo', 145);
track.videoComplete('product-demo', 300);
```

##### E-commerce Events
```tsx
track.addToCart('prod-123', 'Premium T-Shirt', 29.99, {
  category: 'clothing',
  size: 'large',
  color: 'blue'
});

track.purchase('order-456', 89.97, 'USD', {
  items: 3,
  paymentMethod: 'credit-card'
});
```

##### Generic Events
```tsx
track.event('custom_event_type', { 
  key: 'value',
  timestamp: Date.now() 
});
```

### useTrack Hook (Low-level)

For direct access to the core tracking function:

```tsx
import { useTrack } from '@engagetrack/react';

function MyComponent() {
  const { track, isInitialized, sessionId, userId } = useTrack();
  
  const handleCustomEvent = () => {
    track('CUSTOM_EVENT', {
      customData: 'value',
      timestamp: Date.now()
    });
  };
}
```

## TypeScript Support

This package is written in TypeScript and includes full type definitions. You can import types for custom usage:

```tsx
import { TrackingData, EventType, TrackingConfig } from '@engagetrack/react';

interface CustomTrackingData extends TrackingData {
  customField: string;
  numericValue: number;
}

const customData: CustomTrackingData = {
  customField: 'example',
  numericValue: 42
};
```

## Advanced Usage

### Conditional Tracking

```tsx
function MyComponent() {
  const { track, isInitialized } = useTracking();
  
  useEffect(() => {
    if (isInitialized) {
      track.pageView();
    }
  }, [isInitialized]);
}
```

### Custom Event Data

```tsx
const trackWithContext = () => {
  track.customEvent('feature_used', {
    featureName: 'advanced-search',
    userType: 'premium',
    timestamp: Date.now(),
    metadata: {
      version: '2.1.0',
      experiment: 'variant-a'
    }
  });
};
```

### Error Handling

The tracker handles errors gracefully and will not throw exceptions that break your app. Failed requests are logged to the console in development.

## Privacy and GDPR

- Set `disabled={true}` to completely disable tracking
- Use `localStorage.setItem('engageTrackDisabled', 'true')` for user preference
- All tracking respects user privacy settings

## License

MIT
