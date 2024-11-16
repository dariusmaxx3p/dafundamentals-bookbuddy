/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Config } from "@/config/config-loader";
import { DEFAULT_FEATURES } from "@/config/features";
import { CONFIG_URL, GENRES_URL, LOCAL_STORAGE_KEYS } from "@/misc/constants";
import { Genre } from "@/types";
import { useChangeLocale } from "@locales/client";
import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";

export enum AppContextActionType {
  SET_FEATURES = "SET_FEATURES",
  TOGGLE_FEATURE = "TOGGLE_FEATURE",
  SET_GENRES = "SET_GENRES",
  SET_LOCALE = "SET_LOCALE",
  SET_THEME = "SET_THEME",
}

export type AppContextAction = {
  type: AppContextActionType;
  payload: any;
};

export type AppContextFull = Config & {
  genres: Genre[];
  locale: string;
  theme?: "light" | "dark";
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
    case AppContextActionType.SET_LOCALE: {
      if (!action.payload.locale) {
        console.error("SET_LOCALE action requires a locale payload");
        return state;
      }
      localStorage.setItem("bookbuddy-locale", action.payload.locale);
      return {
        ...state,
        locale: action.payload.locale,
      };
    }
    case AppContextActionType.SET_THEME: {
      if (!action.payload.theme) {
        console.error("SET_THEME action requires a theme payload");
        return state;
      }
      return {
        ...state,
        theme: action.payload.theme,
      };
    }
    default:
      return state;
  }
}

export function AppContextProvider({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const [state, dispatch] = useReducer(appContextReducer, {
    features: DEFAULT_FEATURES,
    genres: [],
    locale: "en",
  });

  const changeLocale = useChangeLocale();

  // Load default config
  useEffect(() => {
    if (!dispatch) return;

    const loadConfig = async () => {
      const response = await fetch(CONFIG_URL);
      const data = await response.json();

      dispatch!({
        type: AppContextActionType.SET_FEATURES,
        payload: {
          features: data.data.features,
        },
      });
    };

    loadConfig();
  }, []);

  // Load locale
  useEffect(() => {
    if (!dispatch) return;

    const locale = localStorage.getItem(LOCAL_STORAGE_KEYS.LOCALE) ?? "en";
    if (locale) {
      dispatch!({
        type: AppContextActionType.SET_LOCALE,
        payload: {
          locale,
        },
      });

      changeLocale(locale as any);
    }
  }, []);

  // Load genres
  useEffect(() => {
    if (!dispatch) return;

    const locale = localStorage.getItem(LOCAL_STORAGE_KEYS.LOCALE);
    if (!locale) return;

    const getGeneres = async () => {
      const response = await fetch(`${GENRES_URL}?locale=${locale}`);
      const data = await response.json();

      const genres = data.data;

      dispatch({
        type: AppContextActionType.SET_GENRES,
        payload: {
          genres,
        },
      });
    };

    getGeneres();
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextType {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppContextProvider");
  }
  return context;
}
