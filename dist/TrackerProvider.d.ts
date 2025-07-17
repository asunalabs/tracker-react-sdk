import React, { ReactNode } from "react";
import { EngageTrackConfig, EngageTrackContextType, EngageTrackHooks } from "./types";
export interface EngageTrackProviderProps {
    children: ReactNode;
    config: EngageTrackConfig;
    hooks?: EngageTrackHooks;
}
export declare const EngageTrackProvider: React.FC<EngageTrackProviderProps>;
export declare const useEngageTrack: () => EngageTrackContextType;
