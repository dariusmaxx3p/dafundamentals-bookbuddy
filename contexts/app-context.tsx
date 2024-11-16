/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Config } from "@/config/config-loader";
import { DEFAULT_FEATURES } from "@/config/features";
import { createContext, ReactElement, useReducer } from "react";

export enum AppContextActionType {
  SET_FEATURES = "SET_FEATURES",
  TOGGLE_FEATURE = "TOGGLE_FEATURE",
}

export type AppContextAction = {
  type: AppContextActionType;
  payload: any;
};

export type AppContextType = {
  state: Config;
  dispatch?: (action: any) => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

function appContextReducer(state: Config, action: AppContextAction) {
  switch (action.type) {
    case AppContextActionType.SET_FEATURES:
      {
        if (!action.payload.features) {
          console.error("SET_FEATURES action requires a features payload");
          return state;
        }
        return {
          ...state,
          features: action.payload.features,
        };
      }
    case AppContextActionType.TOGGLE_FEATURE: {
      const { feature } = action.payload;
      if (!feature) {
        console.error("TOGGLE_FEATURE action requires a feature payload");
        return state;
      }
      return {
        ...state,
        features: {
          ...state.features,
          [feature]: !state.features[feature],
        },
      };
    }
    default:
      return state;
  }
}

export function AppContextProvider({
  children,
}: {
  children: ReactElement;
}): ReactElement {
  const [state, dispatch] = useReducer(appContextReducer, {
    features: DEFAULT_FEATURES,
  });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
