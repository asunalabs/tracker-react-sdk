# EngageTrack React SDK

A comprehensive React SDK for EngageTrack analytics and user tracking. This package provides the same functionality as the vanilla JavaScript SDK but with React-specific hooks and components for seamless integration.

## Features

- 🚀 **Easy Integration**: Simple React hooks for tracking
- 📊 **Real-time Analytics**: WebSocket support for live data
- 🔗 **Automatic Link Tracking**: Captures user interactions automatically
- 📈 **Referral Tracking**: Built-in referral and UTM parameter tracking
- 🎯 **Custom Events**: Track any custom event with additional data
- 🔒 **Privacy Friendly**: Respects user privacy with configurable options
- 💻 **TypeScript Support**: Full TypeScript definitions included
- 🌐 **Universal**: Works with SSR/Next.js
- 📱 **Mobile Friendly**: Optimized for mobile devices

## Installation

```bash
npm install @engagetrack/react
# or
yarn add @engagetrack/react
```

## Basic Usage

### 1. Initialize the tracker

```tsx
import React from "react";
import { useEngageTrack, EngageTrackConfig } from "@engagetrack/react";

const config: EngageTrackConfig = {
	siteId: "your-site-id",
	domain: "your-domain.com",
};

function App() {
	const { track, sessionData, onlineUsers } = useEngageTrack(config);

	return (
		<div>
			<h1>My App</h1>
			<p>Session ID: {sessionData?.sessionId}</p>
			<p>Online Users: {onlineUsers?.count || 0}</p>
			<button onClick={() => track("custom_event", { action: "button_click" })}>
				Track Custom Event
			</button>
		</div>
	);
}
```

### 2. Track custom events

```tsx
import { useEngageTrack } from "@engagetrack/react";

function MyComponent() {
	const { track } = useEngageTrack(config);

	const handlePurchase = () => {
		track("purchase", {
			amount: 99.99,
			currency: "USD",
			productId: "prod-123",
		});
	};

	return <button onClick={handlePurchase}>Buy Now</button>;
}
```

### 3. Track referral conversions

```tsx
import { useEngageTrack } from "@engagetrack/react";

function SignupForm() {
	const { trackReferralConversion } = useEngageTrack(config);

	const handleSignup = () => {
		// Track that the user signed up (conversion)
		trackReferralConversion({
			conversionType: "signup",
			value: "free_trial",
		});
	};

	return <button onClick={handleSignup}>Sign Up</button>;
}
```

## Configuration Options

```typescript
interface EngageTrackConfig {
	siteId: string; // Required: Your site ID
	domain: string; // Required: Your domain
}
```

## Event Hooks

You can listen to various events using the hooks parameter:

```tsx
const { track } = useEngageTrack(config, {
	onTrackingEvent: (eventType, data) => {
		console.log("Event tracked:", eventType, data);
	},
	onSessionStart: (sessionData) => {
		console.log("Session started:", sessionData);
	},
	onSessionEnd: (sessionData) => {
		console.log("Session ended:", sessionData);
	},
	onWebSocketConnect: () => {
		console.log("WebSocket connected");
	},
	onWebSocketDisconnect: () => {
		console.log("WebSocket disconnected");
	},
	onOnlineUsersUpdate: (users) => {
		console.log("Online users updated:", users);
	},
	onReferralConversion: (referralData) => {
		console.log("Referral conversion:", referralData);
	},
	onError: (error) => {
		console.error("EngageTrack error:", error);
	},
});
```

## Available Event Types

- `page_view` - Page view tracking
- `page_load` - Page load event
- `page_unload` - Page unload event
- `page_hidden` - Page hidden (tab switch)
- `user_click` - User click event
- `idle_timeout` - User idle timeout
- `session_start` - Session start
- `session_end` - Session end
- `referral_conversion` - Referral conversion
- `custom_event` - Custom event

## Advanced Usage

### Manual Tracking Only

```tsx
const config: EngageTrackConfig = {
	siteId: "your-site-id",
	domain: "your-domain.com",
};

const { track } = useEngageTrack(config);

// Manually track what you need
track("page_view", { customData: "value" });
```

### Next.js Integration

```tsx
// pages/_app.tsx
import { useEngageTrack } from "@engagetrack/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
	const router = useRouter();
	const { track } = useEngageTrack({
		siteId: process.env.NEXT_PUBLIC_SITE_ID,
		domain: process.env.NEXT_PUBLIC_DOMAIN,
	});

	useEffect(() => {
		const handleRouteChange = (url) => {
			track("page_view", { url });
		};

		router.events.on("routeChangeComplete", handleRouteChange);
		return () => {
			router.events.off("routeChangeComplete", handleRouteChange);
		};
	}, [router.events, track]);

	return <Component {...pageProps} />;
}
```

### Custom Event Tracking

```tsx
// Track e-commerce events
const trackPurchase = (orderData) => {
	track("purchase", {
		orderId: orderData.id,
		amount: orderData.total,
		currency: orderData.currency,
		items: orderData.items.map((item) => ({
			id: item.id,
			name: item.name,
			price: item.price,
			quantity: item.quantity,
		})),
	});
};

// Track user engagement
const trackVideoWatch = (videoId, duration) => {
	track("video_watch", {
		videoId,
		duration,
		timestamp: Date.now(),
	});
};

// Track form submissions
const trackFormSubmission = (formName, fields) => {
	track("form_submit", {
		formName,
		fields: Object.keys(fields),
		timestamp: Date.now(),
	});
};
```

## Utility Functions

The SDK exports several utility functions:

```tsx
import {
	generateId,
	setCookie,
	getCookie,
	getReferralData,
	parseReferralParams,
	detectReferralSource,
} from "@engagetrack/react";

// Generate a unique ID
const uniqueId = generateId();

// Work with cookies
setCookie("custom_cookie", "value", 30); // 30 days
const value = getCookie("custom_cookie");

// Get referral information
const referralData = getReferralData();
const urlParams = parseReferralParams();
const referralSource = detectReferralSource();
```

## TypeScript Support

Full TypeScript support is included with comprehensive type definitions:

```typescript
import {
	EngageTrackConfig,
	EventType,
	TrackingData,
	SessionData,
	OnlineUsersData,
	ReferralData,
} from "@engagetrack/react";

// Type-safe configuration
const config: EngageTrackConfig = {
	siteId: "site-123",
	domain: "example.com",
};

// Type-safe event tracking
const trackEvent = (eventType: EventType, data: TrackingData) => {
	track(eventType, data);
};
```

## Privacy and GDPR Compliance

The SDK is designed with privacy in mind:

- Only collects necessary analytics data
- Respects user privacy settings
- Supports opt-out mechanisms
- Uses secure, same-site cookies
- No third-party tracking

To disable tracking:

```javascript
// Set this in localStorage to disable tracking
localStorage.setItem("engageTrackDisabled", "true");
```

## Development

```bash
# Install dependencies
npm install

# Build the package
npm run build

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Start development mode
npm run dev

# Run example
npm run example
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:

- GitHub Issues: [github.com/engagetrack/react-sdk/issues](https://github.com/engagetrack/react-sdk/issues)
- Documentation: [docs.engagetrack.com](https://docs.engagetrack.com)
- Email: support@asunalabs.com
