/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useChangeLocale, useCurrentLocale } from "@locales/client";
import { motion } from "framer-motion";
import Image from "next/image";

export function LocaleToogle(props: { className?: string; size?: number }) {
  const { className } = props;
  const changeLocale = useChangeLocale();
  const locale = useCurrentLocale();

  const switchLocale = (newLocale: string) => {
    changeLocale(newLocale as any);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={"icon"} className={cn(`${className}`)}>
          {locale === "vi" ? (
            <motion.span>Vi</motion.span>
          ) : (
            <motion.span>En</motion.span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => switchLocale("vi")} className="flex flex-row justify-between items-center">
          <span>Tiếng Việt</span> <Image src="/vi.svg" width={20} height={20} alt="Vietnamese-flag" />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchLocale("en")} className="flex flex-row justify-between items-center">
          <span>English</span> <Image src="/en.svg" width={20} height={20} alt="English-flag" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
