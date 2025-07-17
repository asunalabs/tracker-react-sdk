import React, { useState, useCallback } from "react";
import {
	useEngageTrack,
	EngageTrackConfig,
	EventType,
	TrackingData,
} from "@engagetrack/react";

const config: EngageTrackConfig = {
	siteId: "your-site-id",
	domain: "your-domain.com",
	serverUrl: "http://localhost:5000/api/track",
	wsUrl: "ws://localhost:5000/ws",
	debug: true,
	enableWebSocket: true,
	enableAutoTracking: true,
	enableReferralTracking: true,
};

export default function App() {
	const [eventLog, setEventLog] = useState<string[]>([]);
	const [customEvent, setCustomEvent] = useState("");
	const [customData, setCustomData] = useState("{}");

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
			setEventLog((prev) => [...prev, `${eventType}: ${JSON.stringify(data)}`]);
		},
		onSessionStart: (session) => {
			console.log("Session started:", session);
		},
		onSessionEnd: (session) => {
			console.log("Session ended:", session);
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

	const handleCustomEvent = useCallback(() => {
		if (customEvent) {
			let data: TrackingData = {};
			try {
				data = JSON.parse(customData);
			} catch (error) {
				console.error("Invalid JSON in custom data");
				return;
			}
			track(customEvent as EventType, data);
		}
	}, [customEvent, customData, track]);

	const handleTrackReferral = useCallback(() => {
		trackReferralConversion({ source: "manual_test" });
	}, [trackReferralConversion]);

	const handleGetSessionData = useCallback(() => {
		const session = getSessionData();
		console.log("Current session data:", session);
	}, [getSessionData]);

	const handleGetReferralData = useCallback(() => {
		const referral = getReferralData();
		console.log("Current referral data:", referral);
	}, [getReferralData]);

	return (
		<div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
			<h1>EngageTrack React SDK Demo</h1>

			<div style={{ marginBottom: "20px" }}>
				<h2>Status</h2>
				<p>Initialized: {isInitialized ? "✅" : "❌"}</p>
				<p>WebSocket Connected: {isConnected ? "🟢" : "🔴"}</p>
				<p>Session ID: {sessionData?.sessionId || "None"}</p>
				<p>User ID: {sessionData?.userId || "None"}</p>
				<p>
					Time Spent:{" "}
					{sessionData?.timeSpent
						? `${Math.floor(sessionData.timeSpent / 1000)}s`
						: "0s"}
				</p>
				<p>Online Users: {onlineUsers?.count || 0}</p>

				<button onClick={reconnect} style={{ marginTop: "10px" }}>
					Reconnect WebSocket
				</button>
			</div>

			<div style={{ marginBottom: "20px" }}>
				<h2>Quick Actions</h2>
				<button
					onClick={() => track("page_view")}
					style={{ marginRight: "10px" }}
				>
					Track Page View
				</button>
				<button
					onClick={() => track("user_click", { element: "demo-button" })}
					style={{ marginRight: "10px" }}
				>
					Track Click
				</button>
				<button onClick={handleTrackReferral} style={{ marginRight: "10px" }}>
					Track Referral
				</button>
				<button onClick={handleGetSessionData} style={{ marginRight: "10px" }}>
					Get Session Data
				</button>
				<button onClick={handleGetReferralData}>Get Referral Data</button>
			</div>

			<div style={{ marginBottom: "20px" }}>
				<h2>Custom Event</h2>
				<div style={{ marginBottom: "10px" }}>
					<input
						type="text"
						placeholder="Event type (e.g., custom_event)"
						value={customEvent}
						onChange={(e) => setCustomEvent(e.target.value)}
						style={{ marginRight: "10px", padding: "5px" }}
					/>
					<input
						type="text"
						placeholder="Custom data (JSON)"
						value={customData}
						onChange={(e) => setCustomData(e.target.value)}
						style={{ padding: "5px", width: "200px" }}
					/>
					<button onClick={handleCustomEvent} style={{ marginLeft: "10px" }}>
						Track Custom Event
					</button>
				</div>
			</div>

			<div style={{ marginBottom: "20px" }}>
				<h2>Event Log</h2>
				<div
					style={{
						height: "200px",
						overflow: "auto",
						border: "1px solid #ccc",
						padding: "10px",
						backgroundColor: "#f9f9f9",
					}}
				>
					{eventLog.map((log, index) => (
						<div key={index} style={{ marginBottom: "5px", fontSize: "12px" }}>
							{log}
						</div>
					))}
				</div>
				<button onClick={() => setEventLog([])} style={{ marginTop: "10px" }}>
					Clear Log
				</button>
			</div>

			<div>
				<h2>Test Links</h2>
				<p>Click these links to test automatic link tracking:</p>
				<a href="/test-page" style={{ display: "block", marginBottom: "5px" }}>
					Internal Link
				</a>
				<a
					href="https://example.com"
					target="_blank"
					rel="noopener noreferrer"
					style={{ display: "block", marginBottom: "5px" }}
				>
					External Link
				</a>
				<a
					href="mailto:test@example.com"
					style={{ display: "block", marginBottom: "5px" }}
				>
					Email Link
				</a>
			</div>
		</div>
	);
}
