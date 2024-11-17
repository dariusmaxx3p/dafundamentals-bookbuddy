"use client";

import { useScopedI18n } from "@locales/client";
import { ReactLenis } from "@studio-freight/react-lenis";
import { motion } from "framer-motion";
export default function AboutPage() {
  const aboutScopedT = useScopedI18n("about");
  return (
    <ReactLenis root>
      <motion.div className="about flex flex-col px-8 py-8">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="font-sans text-6xl self-center gradient-text"
          style={{
            fontWeight: 200,
            letterSpacing: "0.2rem",
          }}
        >
          {aboutScopedT("about")} BookBuddy
        </motion.h2>

        <motion.h3
          className="font-sans text-4xl text-green-yellow-500 mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          style={{
            fontWeight: 100,
            letterSpacing: "0.2rem",
          }}
        >
          Your Ultimate Reading Companion
        </motion.h3>

        <motion.p
          className="w-3/4 font-sans text-xl mt-12"
          style={{
            fontWeight: 100,
            letterSpacing: "0.1rem",
            lineHeight: "2rem",
          }}
        >
          Welcome to{" "}
          <motion.span className="gradient-text">BookBuddy</motion.span>—the
          intelligent platform designed to elevate your reading experience.
          Whether you&apos;re an avid bookworm, a casual reader, or someone
          looking to rediscover the joy of reading,{" "}
          <motion.span className="gradient-text">BookBuddy</motion.span> is here
          to accompany you on every literary journey.
        </motion.p>

        <motion.h3
          className="font-sans text-4xl text-green-yellow-500 mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          style={{
            fontWeight: 100,
            letterSpacing: "0.2rem",
          }}
        >
          Our missions
        </motion.h3>

        <motion.p
          className="w-3/4 font-sans text-xl mt-12"
          style={{
            fontWeight: 100,
            letterSpacing: "0.1rem",
            lineHeight: "2rem",
          }}
        >
          At BookBuddy, our mission is to empower readers by providing a
          seamless and personalized platform to manage, discover, and engage
          with books. We believe that every reader deserves a tailored
          experience that adapts to their unique preferences and reading habits.
        </motion.p>
      </motion.div>
    </ReactLenis>
  );
}
