"use client";

import { useCurrentLocale } from "@locales/client";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";
import styles from "@styles/logo.module.scss";

export default function Logo(props: {
  className?: string;
  width?: number;
  height?: number;
  hoverInitial?: boolean;
}) {
  const locale = useCurrentLocale();
  const { className, width, height, hoverInitial } = props;
  const [hover, setHover] = useState(hoverInitial ?? false);

  const onMouseEnter = () => setHover(true);

  const onMouseLeave = () => setHover(false);

  return (
    <Link href={`/${locale}`}>
      <motion.div
        className="logo flex flex-row items-center"
        layout
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <motion.img
          src={"/logo/logo.svg"}
          width={width ?? 32}
          height={height ?? 32}
          className={cn(`${className}`)}
          initial={{ scale: 0.2, opacity: 0 }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.4, bounce: 0.05 }}
        />
        <motion.h1
          initial={{ opacity: 0, width: 0 }}
          animate={
            hover ? { opacity: 1, width: "auto" } : { opacity: 0, width: 0 }
          }
          className={`${styles["logo__text"]}`}
          style={{
            fontWeight: 200,
            letterSpacing: "0.2rem",
          }}
        >
          BookBuddy
        </motion.h1>
      </motion.div>
    </Link>
  );
}
