import React, { useState, useCallback, useEffect } from "react";
import { useEngageTrack, EngageTrackConfig } from "@engagetrack/react";

// Comprehensive demo showing all features
export default function ComprehensiveDemo() {
	const [logs, setLogs] = useState<string[]>([]);
	const [isOptedOut, setIsOptedOut] = useState(false);
	const [customEventType, setCustomEventType] = useState("custom_event");
	const [customEventData, setCustomEventData] = useState('{"action": "demo"}');

	const config: EngageTrackConfig = {
		siteId: "demo-site-123",
		domain: "demo.engagetrack.com",
		serverUrl: "http://localhost:5000/api/track",
		wsUrl: "ws://localhost:5000/ws",
		debug: true,
		enableWebSocket: true,
		enableAutoTracking: true,
		enableReferralTracking: true,
		idleTimeout: 30000,
		heartbeatInterval: 30000,
		maxReconnectAttempts: 5,
	};

	const addLog = useCallback((message: string) => {
		setLogs((prev) => [
			...prev.slice(-49),
			`${new Date().toLocaleTimeString()}: ${message}`,
		]);
	}, []);

	const {
		track,
		trackReferralConversion,
		sessionData,
		onlineUsers,
		isConnected,
		isInitialized,
		reconnect,
		getSessionData,
		getReferralData,
	} = useEngageTrack(config, {
		onTrackingEvent: (eventType, data) => {
			addLog(
				`📊 Event: ${eventType} - ${JSON.stringify(data).substring(0, 100)}`
			);
		},
		onSessionStart: (session) => {
			addLog(`🚀 Session started: ${session.sessionId}`);
		},
		onSessionEnd: (session) => {
			addLog(
				`🛑 Session ended: ${session.sessionId} (${Math.floor(
					session.timeSpent / 1000
				)}s)`
			);
		},
		onWebSocketConnect: () => {
			addLog("🔌 WebSocket connected");
		},
		onWebSocketDisconnect: () => {
			addLog("❌ WebSocket disconnected");
		},
		onOnlineUsersUpdate: (users) => {
			addLog(`👥 Online users: ${users.count}`);
		},
		onReferralConversion: (referralData) => {
			addLog(
				`🎯 Referral conversion: ${referralData.source?.source || "direct"}`
			);
		},
		onError: (error) => {
			addLog(`❌ Error: ${error.message}`);
		},
	});

	// Simulate e-commerce tracking
	const trackEcommerce = useCallback(() => {
		track("purchase", {
			orderId: "order-" + Math.random().toString(36).substr(2, 9),
			amount: 99.99,
			currency: "USD",
			items: [
				{ id: "item-1", name: "Product 1", price: 59.99, quantity: 1 },
				{ id: "item-2", name: "Product 2", price: 39.99, quantity: 1 },
			],
			paymentMethod: "credit_card",
			shippingMethod: "standard",
		});
	}, [track]);

	// Simulate form tracking
	const trackForm = useCallback(() => {
		track("form_submit", {
			formName: "newsletter_signup",
			fields: ["email", "firstName", "preferences"],
			formId: "newsletter-form",
			conversionValue: "email_signup",
		});
	}, [track]);

	// Simulate video tracking
	const trackVideo = useCallback(() => {
		track("video_watch", {
			videoId: "demo-video-123",
			title: "Product Demo Video",
			duration: 120,
			watchTime: 85,
			quality: "1080p",
			completed: false,
		});
	}, [track]);

	// Simulate search tracking
	const trackSearch = useCallback(() => {
		track("search", {
			query: "react analytics",
			resultsCount: 42,
			filters: ["category:development", "type:tutorial"],
			sortBy: "relevance",
		});
	}, [track]);

	// Track custom event with user input
	const trackCustomEvent = useCallback(() => {
		try {
			const data = JSON.parse(customEventData);
			track(customEventType as any, data);
		} catch (error) {
			addLog("❌ Invalid JSON in custom event data");
		}
	}, [customEventType, customEventData, track]);

	// Handle opt-out
	const handleOptOut = useCallback(() => {
		if (isOptedOut) {
			localStorage.removeItem("engageTrackDisabled");
			setIsOptedOut(false);
			addLog("✅ Tracking enabled");
		} else {
			localStorage.setItem("engageTrackDisabled", "true");
			setIsOptedOut(true);
			addLog("🚫 Tracking disabled");
		}
	}, [isOptedOut, addLog]);

	// Check opt-out status on mount
	useEffect(() => {
		setIsOptedOut(localStorage.getItem("engageTrackDisabled") === "true");
	}, []);

	// Simulate page view tracking
	const trackPageView = useCallback(() => {
		track("page_view", {
			url: "/demo-page",
			title: "Demo Page",
			section: "demo",
			category: "testing",
		});
	}, [track]);

	return (
		<div
			style={{
				fontFamily: "Arial, sans-serif",
				maxWidth: "1200px",
				margin: "0 auto",
				padding: "20px",
			}}
		>
			<h1>🚀 EngageTrack React SDK - Comprehensive Demo</h1>

			{/* Status Section */}
			<div
				style={{
					backgroundColor: "#f8f9fa",
					padding: "20px",
					borderRadius: "8px",
					marginBottom: "20px",
					border: "1px solid #e9ecef",
				}}
			>
				<h2>📊 Status Dashboard</h2>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
						gap: "15px",
					}}
				>
					<div>
						<strong>Initialized:</strong> {isInitialized ? "✅ Yes" : "❌ No"}
					</div>
					<div>
						<strong>WebSocket:</strong>{" "}
						{isConnected ? "🟢 Connected" : "🔴 Disconnected"}
					</div>
					<div>
						<strong>Session ID:</strong>{" "}
						{sessionData?.sessionId?.substring(0, 8) || "None"}...
					</div>
					<div>
						<strong>User ID:</strong>{" "}
						{sessionData?.userId?.substring(0, 8) || "None"}...
					</div>
					<div>
						<strong>Time Spent:</strong>{" "}
						{sessionData?.timeSpent
							? `${Math.floor(sessionData.timeSpent / 1000)}s`
							: "0s"}
					</div>
					<div>
						<strong>Online Users:</strong> {onlineUsers?.count || 0}
					</div>
				</div>
				<div style={{ marginTop: "10px" }}>
					<button onClick={reconnect} style={{ marginRight: "10px" }}>
						🔄 Reconnect
					</button>
					<button onClick={handleOptOut}>
						{isOptedOut ? "✅ Enable Tracking" : "🚫 Disable Tracking"}
					</button>
				</div>
			</div>

			{/* Basic Tracking Section */}
			<div
				style={{
					backgroundColor: "#fff",
					padding: "20px",
					borderRadius: "8px",
					marginBottom: "20px",
					border: "1px solid #e9ecef",
				}}
			>
				<h2>🎯 Basic Tracking</h2>
				<div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
					<button onClick={trackPageView}>📄 Page View</button>
					<button
						onClick={() =>
							track("user_click", {
								element: "demo-button",
								location: "basic-section",
							})
						}
					>
						👆 User Click
					</button>
					<button
						onClick={() =>
							trackReferralConversion({ source: "demo", value: "test" })
						}
					>
						🎯 Referral Conversion
					</button>
					<button
						onClick={() => {
							const session = getSessionData();
							addLog(`📋 Session: ${JSON.stringify(session)}`);
						}}
					>
						📋 Get Session
					</button>
					<button
						onClick={() => {
							const referral = getReferralData();
							addLog(`🔗 Referral: ${JSON.stringify(referral)}`);
						}}
					>
						🔗 Get Referral
					</button>
				</div>
			</div>

			{/* E-commerce Tracking Section */}
			<div
				style={{
					backgroundColor: "#fff",
					padding: "20px",
					borderRadius: "8px",
					marginBottom: "20px",
					border: "1px solid #e9ecef",
				}}
			>
				<h2>🛒 E-commerce Tracking</h2>
				<div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
					<button onClick={trackEcommerce}>💳 Purchase</button>
					<button
						onClick={() =>
							track("add_to_cart", {
								productId: "prod-123",
								price: 29.99,
								quantity: 1,
							})
						}
					>
						🛒 Add to Cart
					</button>
					<button
						onClick={() => track("remove_from_cart", { productId: "prod-123" })}
					>
						❌ Remove from Cart
					</button>
					<button
						onClick={() =>
							track("checkout_start", { cartValue: 89.97, itemCount: 3 })
						}
					>
						🚀 Checkout Start
					</button>
					<button
						onClick={() =>
							track("checkout_complete", {
								orderId: "order-456",
								amount: 89.97,
							})
						}
					>
						✅ Checkout Complete
					</button>
				</div>
			</div>

			{/* User Engagement Section */}
			<div
				style={{
					backgroundColor: "#fff",
					padding: "20px",
					borderRadius: "8px",
					marginBottom: "20px",
					border: "1px solid #e9ecef",
				}}
			>
				<h2>👥 User Engagement</h2>
				<div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
					<button onClick={trackForm}>📝 Form Submit</button>
					<button onClick={trackVideo}>🎥 Video Watch</button>
					<button onClick={trackSearch}>🔍 Search</button>
					<button
						onClick={() =>
							track("download", { fileName: "demo-file.pdf", fileSize: 1024 })
						}
					>
						📥 Download
					</button>
					<button
						onClick={() =>
							track("share", { platform: "twitter", url: window.location.href })
						}
					>
						📤 Share
					</button>
				</div>
			</div>

			{/* Custom Event Section */}
			<div
				style={{
					backgroundColor: "#fff",
					padding: "20px",
					borderRadius: "8px",
					marginBottom: "20px",
					border: "1px solid #e9ecef",
				}}
			>
				<h2>🎨 Custom Event Tracking</h2>
				<div style={{ marginBottom: "15px" }}>
					<input
						type="text"
						placeholder="Event type"
						value={customEventType}
						onChange={(e) => setCustomEventType(e.target.value)}
						style={{ marginRight: "10px", padding: "8px", width: "200px" }}
					/>
					<input
						type="text"
						placeholder="Event data (JSON)"
						value={customEventData}
						onChange={(e) => setCustomEventData(e.target.value)}
						style={{ marginRight: "10px", padding: "8px", width: "300px" }}
					/>
					<button onClick={trackCustomEvent}>🎯 Track Custom Event</button>
				</div>
				<div style={{ fontSize: "12px", color: "#666" }}>
					Example: {"{"}"action": "button_click", "section": "header", "value":
					100{"}"}
				</div>
			</div>

			{/* Test Links Section */}
			<div
				style={{
					backgroundColor: "#fff",
					padding: "20px",
					borderRadius: "8px",
					marginBottom: "20px",
					border: "1px solid #e9ecef",
				}}
			>
				<h2>🔗 Link Tracking Test</h2>
				<p style={{ marginBottom: "15px" }}>
					Click these links to test automatic link tracking:
				</p>
				<div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
					<a href="/internal-page" style={{ color: "#007bff" }}>
						🏠 Internal Link (will be tracked and prevent navigation)
					</a>
					<a
						href="https://example.com"
						target="_blank"
						rel="noopener noreferrer"
						style={{ color: "#007bff" }}
					>
						🌐 External Link (new tab)
					</a>
					<a href="mailto:test@example.com" style={{ color: "#007bff" }}>
						📧 Email Link
					</a>
					<a href="tel:+1234567890" style={{ color: "#007bff" }}>
						📞 Phone Link
					</a>
				</div>
			</div>

			{/* Event Log Section */}
			<div
				style={{
					backgroundColor: "#fff",
					padding: "20px",
					borderRadius: "8px",
					marginBottom: "20px",
					border: "1px solid #e9ecef",
				}}
			>
				<h2>📋 Event Log</h2>
				<div style={{ marginBottom: "10px" }}>
					<button onClick={() => setLogs([])}>🗑️ Clear Log</button>
					<span style={{ marginLeft: "10px", fontSize: "14px", color: "#666" }}>
						({logs.length} events)
					</span>
				</div>
				<div
					style={{
						height: "300px",
						overflow: "auto",
						border: "1px solid #ccc",
						padding: "10px",
						backgroundColor: "#f8f9fa",
						fontFamily: "monospace",
						fontSize: "12px",
						borderRadius: "4px",
					}}
				>
					{logs.length === 0 ? (
						<div style={{ color: "#666", fontStyle: "italic" }}>
							No events yet. Try clicking some buttons above!
						</div>
					) : (
						logs.map((log, index) => (
							<div
								key={index}
								style={{ marginBottom: "5px", wordBreak: "break-word" }}
							>
								{log}
							</div>
						))
					)}
				</div>
			</div>

			{/* Instructions Section */}
			<div
				style={{
					backgroundColor: "#e7f3ff",
					padding: "20px",
					borderRadius: "8px",
					border: "1px solid #b3d9ff",
				}}
			>
				<h2>ℹ️ Instructions</h2>
				<ul style={{ marginBottom: "15px" }}>
					<li>
						All events are tracked automatically and logged in the Event Log
						section
					</li>
					<li>
						WebSocket connection provides real-time features (online users,
						etc.)
					</li>
					<li>
						Link tracking intercepts internal links and tracks external ones
					</li>
					<li>
						Custom events can be tracked with any event type and JSON data
					</li>
					<li>Privacy controls allow users to opt-out of tracking</li>
					<li>Session data persists across page reloads via cookies</li>
					<li>
						Referral data is captured from URL parameters and referrer headers
					</li>
				</ul>
				<p style={{ fontSize: "14px", color: "#666" }}>
					Check the browser console for additional debug information when debug
					mode is enabled.
				</p>
			</div>
		</div>
	);
}
