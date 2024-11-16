"use client";

import Accessibility from "./accessibility";
import Logo from "./logo";
import { AnimatePresence, motion } from "framer-motion";

export default function Header(props: { showAccessibility?: boolean }) {
  const { showAccessibility } = props;
  return (
    <motion.div
      className="header flex flex-row px-8 py-4 justify-between"
      layout
    >
      <motion.div layout>
        <Logo width={32} height={32} hoverInitial={true} />
      </motion.div>

      <AnimatePresence>
        {showAccessibility && (
          <motion.div
            layout
            layoutId="header__accessibility"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", duration: 0.2, bounce: 0.05 }}
          >
            <Accessibility />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
