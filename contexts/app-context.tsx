/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Config } from "@/config/config-loader";
import { DEFAULT_FEATURES } from "@/config/features";
import { CONFIG_URL } from "@/misc/constants";
import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useReducer,
} from "react";

export enum AppContextActionType {
  SET_FEATURES = "SET_FEATURES",
  TOGGLE_FEATURE = "TOGGLE_FEATURE",
  SET_GENRES = "SET_GENRES",
}

export type AppContextAction = {
  type: AppContextActionType;
  payload: any;
};

export type AppContextFull = Config & {
  genres: string[];
};

export type AppContextType = {
  state: AppContextFull;
  dispatch?: (action: any) => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

function appContextReducer(state: AppContextFull, action: AppContextAction) {
  switch (action.type) {
    case AppContextActionType.SET_FEATURES: {
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
    case AppContextActionType.SET_GENRES: {
      if (!action.payload.genres) {
        console.error("SET_GENRES action requires a genres payload");
        return state;
      }
      return {
        ...state,
        genres: action.payload.genres,
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
    genres: [],
  });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextType {
  const context = useContext(AppContext);

  // Load default config
  useEffect(() => {
    if (!context?.dispatch) return;

    const loadConfig = async () => {
      const response = await fetch(CONFIG_URL);
      const data = await response.json();

      context.dispatch!({
        type: AppContextActionType.SET_FEATURES,
        payload: {
          features: data.data.features,
        },
      });
    };

    loadConfig();
  }, []);

  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppContextProvider");
  }
  return context;
}
