"use client";

import { Book } from "@entities/Book";
import { ReactLenis } from "@studio-freight/react-lenis";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BookItem from "@components/ui/book";

export default function HomePage() {
  return (
    <ReactLenis root>
      <motion.div
        className="home-page flex flex-row flex-wrap px-12 items-center justify-start"
        layout
      ></motion.div>
    </ReactLenis>
  );
}
