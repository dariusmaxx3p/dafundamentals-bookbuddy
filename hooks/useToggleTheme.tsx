"use client";

import { LOCAL_STORAGE_KEYS } from "@/misc/constants";
import { AppContextActionType, useAppContext } from "@contexts/app-context";
import { useTheme } from "next-themes";

export default function useToggleTheme() {
  const { setTheme } = useTheme();
  const { dispatch } = useAppContext();
  const toggleTheme = (theme: "light" | "dark") => {
    setTheme(theme);

    // Update to context
    if (dispatch) {
      dispatch({
        type: AppContextActionType.SET_THEME,
        payload: {
          theme,
        },
      });
    }

    // Update to localStorage
    localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, theme);
  };

  return { toggleTheme };
}
