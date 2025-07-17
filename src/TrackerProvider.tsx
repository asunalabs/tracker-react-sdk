import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
	useCallback,
} from "react";
import { EngageTracker } from "./EngageTracker";
import {
	EngageTrackConfig,
	EngageTrackContextType,
	EventType,
	TrackingData,
	SessionData,
	OnlineUsersData,
	ReferralData,
	EngageTrackHooks,
} from "./types";

const EngageTrackContext = createContext<EngageTrackContextType | null>(null);

export interface EngageTrackProviderProps {
	children: ReactNode;
	config: EngageTrackConfig;
	hooks?: EngageTrackHooks;
}

export const EngageTrackProvider: React.FC<EngageTrackProviderProps> = ({
	children,
	config,
	hooks = {},
}) => {
	const [tracker, setTracker] = useState<EngageTracker | null>(null);
	const [isInitialized, setIsInitialized] = useState(false);
	const [sessionData, setSessionData] = useState<SessionData | null>(null);
	const [onlineUsers, setOnlineUsers] = useState<OnlineUsersData | null>(null);
	const [isConnected, setIsConnected] = useState(false);

	useEffect(() => {
		if (typeof window === "undefined") return;

		const trackerHooks: EngageTrackHooks = {
			...hooks,
			onSessionStart: (session) => {
				setSessionData(session);
				hooks.onSessionStart?.(session);
			},
			onSessionEnd: (session) => {
				setSessionData(null);
				hooks.onSessionEnd?.(session);
			},
			onWebSocketConnect: () => {
				setIsConnected(true);
				hooks.onWebSocketConnect?.();
			},
			onWebSocketDisconnect: () => {
				setIsConnected(false);
				hooks.onWebSocketDisconnect?.();
			},
			onOnlineUsersUpdate: (users) => {
				setOnlineUsers(users);
				hooks.onOnlineUsersUpdate?.(users);
			},
		};

		try {
			const trackerInstance = new EngageTracker(config, trackerHooks);
			setTracker(trackerInstance);
			setIsInitialized(true);
		} catch (error) {
			console.error("Failed to initialize EngageTracker:", error);
			hooks.onError?.(error as Error);
		}

		return () => {
			if (tracker) {
				tracker.destroy();
			}
		};
	}, [config.siteId, config.domain]); // Only re-initialize if core config changes

	const track = useCallback(
		(eventType: EventType, data?: TrackingData) => {
			if (tracker) {
				tracker.track(eventType, data);
			}
		},
		[tracker]
	);

	const trackReferralConversion = useCallback(
		(data?: TrackingData) => {
			if (tracker) {
				tracker.trackReferralConversion(data);
			}
		},
		[tracker]
	);

	const getSessionData = useCallback(() => {
		return tracker?.getSessionData() || null;
	}, [tracker]);

	const getReferralData = useCallback(() => {
		return tracker?.getReferralData() || null;
	}, [tracker]);

	const reconnect = useCallback(() => {
		if (tracker) {
			tracker.reconnect();
		}
	}, [tracker]);

	const contextValue: EngageTrackContextType = {
		config,
		isInitialized,
		sessionData,
		onlineUsers,
		track,
		trackReferralConversion,
		getSessionData,
		getReferralData,
		isConnected,
		reconnect,
	};

	return (
		<EngageTrackContext.Provider value={contextValue}>
			{children}
		</EngageTrackContext.Provider>
	);
};

export const useEngageTrack = (): EngageTrackContextType => {
	const context = useContext(EngageTrackContext);

	if (!context) {
		throw new Error(
			"useEngageTrack must be used within an EngageTrackProvider"
		);
	}

	return context;
};
