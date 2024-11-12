"use client";

import Header from "@components/ui/header";
import { I18nProviderClient } from "@locales/client";
import { ReactNode } from "react";

export default function LocaleLayout(props: { children: ReactNode }) {
  const { children } = props;
  return (
    <I18nProviderClient locale="en">
      <div className="locale-layout flex flex-col">
        <Header />
        {children}
      </div>
    </I18nProviderClient>
  );
}
