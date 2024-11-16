"use client";

import Header from "@components/ui/header";
import { useAppContext } from "@contexts/app-context";
import { I18nProviderClient } from "@locales/client";
import { ReactNode } from "react";

export default function LocaleLayout(props: { children: ReactNode }) {
  const { children } = props;
  const appContext = useAppContext();

  return (
    <I18nProviderClient locale={appContext.state.locale}>
      <div className="locale-layout flex flex-col">
        <Header showAccessibility={true} />
        {children}
      </div>
    </I18nProviderClient>
  );
}
