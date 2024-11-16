/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import useToggleTheme from "@hooks/useToggleTheme";

export function ModeToggle(props: { className?: string; size?: number }) {
  const { className } = props;
  const { theme } = useTheme();
  const { toggleTheme } = useToggleTheme();

  const switchTheme = (newTheme: string) => {
    if (!document.startViewTransition) {
      toggleTheme(newTheme as any);
      return;
    }

    document.startViewTransition(() => {
      toggleTheme(newTheme as any);
      const root = document.documentElement;
      if (newTheme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    });
  };

  React.useEffect(() => {
    document.documentElement.style.setProperty(
      "--expo-out",
      `
    linear(
      0 0%,
      0.1684 2.66%,
      0.3165 5.49%,
      0.446 8.52%,
      0.5581 11.78%,
      0.6535 15.29%,
      0.7341 19.11%,
      0.8011 23.3%,
      0.8557 27.93%,
      0.8962 32.68%,
      0.9283 38.01%,
      0.9529 44.08%,
      0.9711 51.14%,
      0.9833 59.06%,
      0.9915 68.74%,
      1 100%
    );
      `
    );
  }, []);

  return (
    <>
      <style jsx global>{`
        ::view-transition-group(root) {
          animation-timing-function: var(--expo-out);
        }
        ::view-transition-new(root) {
          mask: url("/custom-svg.svg") top left / 0 no-repeat;
          mask-origin: top left;
          animation: scale 1.5s;
        }
        ::view-transition-old(root),
        .dark::view-transition-old(root) {
          animation: scale 1.5s;
          z-index: -1;
          transform-origin: top left;
        }
        @keyframes scale {
          to {
            mask-size: 200vmax;
          }
        }
      `}</style>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size={"icon"}
            className={cn(`${className}`)}
          >
            {theme === "light" ? (
              <Sun
                className={`rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0`}
                size={32}
              />
            ) : (
              <Moon
                className={`absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100`}
                size={32}
              />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => switchTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => switchTheme("dark")}>
            Dark
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
