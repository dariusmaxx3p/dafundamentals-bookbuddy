"use client";
import { motion } from "framer-motion";
import { ModeToggle } from "./mode-toogle";
import { LocaleToogle } from "./locale-toggle";
import { useAppContext } from "@contexts/app-context";
import { FEATURES } from "@/config/features";

export default function Accessibility() {
  const { state } = useAppContext();
  const allowToogleTheme = state.features[FEATURES.TOGGLE_THEME];
  const allowToogleLocale = state.features[FEATURES.TOGGLE_LOCALE];
  return (
    <motion.div className="flex flex-row">
      {allowToogleTheme && <ModeToggle className="mr-4" />}
      {allowToogleLocale && <LocaleToogle />}
    </motion.div>
  );
}
