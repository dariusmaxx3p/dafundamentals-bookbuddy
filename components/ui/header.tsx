"use client";

import Accessibility from "./accessibility";
import Logo from "./logo";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.div
      className="header flex flex-row px-8 py-4 justify-between"
      layout
    >
      <motion.div layout>
        <Logo width={32} height={32} />
      </motion.div>
      <Accessibility />
    </motion.div>
  );
}
