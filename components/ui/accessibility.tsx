"use client";
import { motion } from "framer-motion";
import { ModeToggle } from "./mode-toogle";
import { LocaleToogle } from "./locale-toggle";

export default function Accessibility() {
  return (
    <motion.div className="flex flex-row">
      <ModeToggle className="px-4" />
      <LocaleToogle className="ml-2" />
    </motion.div>
  );
}
