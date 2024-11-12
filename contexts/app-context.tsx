/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createContext, ReactElement, useReducer } from "react";

export enum AppContextActionType {}

export type AppContextAction = {
  type: AppContextActionType;
  payload: any;
};

export type AppState = {
  [key: string]: any;
};

export type AppContextType = {
  state: AppState;
  dispatch?: (action: any) => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

function appContextReducer(state: AppState, action: AppContextAction) {
  switch (action.type) {
    default:
      return state;
  }
}

export function AppContextProvider({
  children,
}: {
  children: ReactElement;
}): ReactElement {
  const [state, dispatch] = useReducer(appContextReducer, {});

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
