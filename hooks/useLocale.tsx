"use client";

import { LOCAL_STORAGE_KEYS } from "@/misc/constants";
import { AppContextActionType, useAppContext } from "@contexts/app-context";
import { useChangeLocale } from "@locales/client";

export default function useLocale() {
  const appContext = useAppContext();
  const changeLocale = useChangeLocale();

  const setLocale = (locale: string) => {
    if (!appContext.dispatch) return;

    appContext.dispatch({
      type: AppContextActionType.SET_LOCALE,
      payload: { locale },
    });

    // Update to localStorage
    localStorage.setItem(LOCAL_STORAGE_KEYS.LOCALE, locale);

    // Update to i18n
    changeLocale(locale as any);
  };

  return { setLocale };
}
