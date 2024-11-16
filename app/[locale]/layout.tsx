"use client";

import Header from "@components/ui/header";
import { AppContextProvider } from "@contexts/app-context";
import { I18nProviderClient } from "@locales/client";
import { ReactNode } from "react";

export default function LocaleLayout(props: { children: ReactNode }) {
  const { children } = props;
  return (
    <I18nProviderClient locale="en">
      <AppContextProvider>
        <div className="locale-layout flex flex-col">
          <Header showAccessibility={true} />
          {children}
        </div>
      </AppContextProvider>
    </I18nProviderClient>
  );
}
