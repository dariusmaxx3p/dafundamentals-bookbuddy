"use client";
import { ReactLenis } from "@studio-freight/react-lenis";
import { motion } from "framer-motion";
import BigMenu from "@components/ui/big-menu";
import styles from "@styles/home-page.module.scss";
import { MoveDown } from "lucide-react";
import GradientLine from "@components/ui/grandient-line";
import { useEffect, useState } from "react";
import { useAppContext } from "@contexts/app-context";
import { useScopedI18n } from "@locales/client";

export default function HomePage() {
  const { state } = useAppContext();
  const [genres, setGenres] = useState<string[]>([]);

  const heroScopedT = useScopedI18n("hero");
  const commonScopedT = useScopedI18n("common");

  useEffect(() => {
    setGenres(state.genres);
  }, [state, setGenres]);

  return (
    <ReactLenis root>
      <motion.div
        className="home-page flex flex-row flex-wrap px-12 items-center justify-between"
        layout
      >
        <motion.div
          className="hero-content flex flex-row items-center justify-between my-12 mb-[9rem]"
          layout
        >
          <div className="flex flex-col mr-[3rem]">
            <h2 className={`${styles["hero__text"]}`}>
              {heroScopedT("title")}
            </h2>
            <div className="flex flex-row items-center mt-4 justify-center">
              <motion.button
                className={`rounded-full px-4 py-4 flex flex-row items-center justify-center ${styles["move-btn"]} mt-[3rem]`}
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", duration: 0.4, bounce: 0.05 }}
              >
                <MoveDown size={27} />
              </motion.button>
            </div>
          </div>
          <div className="self-center flex-1">
            <BigMenu />
          </div>
        </motion.div>
        <GradientLine />
        <motion.div className="my-12 flex flex-col">
          <h3
            className="flex flex-row text-4xl font-sans items-baseline font-bold"
            style={{
              fontWeight: 200,
            }}
          >
            {commonScopedT("with")}
            <span
              className="mx-2 gradient-text text-5xl"
              style={{
                fontWeight: 600,
              }}
            >
              {genres.length}
            </span>
            {commonScopedT("genres")}
          </h3>
        </motion.div>
      </motion.div>
    </ReactLenis>
  );
}
