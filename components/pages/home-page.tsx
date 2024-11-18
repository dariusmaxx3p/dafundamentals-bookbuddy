/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { ReactLenis } from "@studio-freight/react-lenis";
import { motion } from "framer-motion";
import BigMenu from "@components/ui/big-menu";
import styles from "@styles/home-page.module.scss";
import { MoveDown } from "lucide-react";
import GradientLine from "@components/ui/grandient-line";
import { useEffect, useState } from "react";
import { AppContextActionType, useAppContext } from "@contexts/app-context";
import { useCurrentLocale, useScopedI18n } from "@locales/client";
import { Genre } from "@/types";
import Link from "next/link";
import { GENRES_URL } from "@/misc/constants";

export default function HomePage() {
  const { state, dispatch } = useAppContext();
  const [genres, setGenres] = useState<Genre[]>(state.genres);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const locale = useCurrentLocale();

  const heroScopedT = useScopedI18n("hero");
  const commonScopedT = useScopedI18n("common");

  useEffect(() => {
    setGenres(state.genres);
  }, [state]);

  useEffect(() => {
    const loadGeneres = async () => {
      if (!dispatch) return;

      const response = await fetch(`${GENRES_URL}?locale=${locale}`);
      const data = await response.json();
      const genres = data.data;

      dispatch({
        type: AppContextActionType.SET_GENRES,
        payload: { genres },
      });
    };

    loadGeneres();
  }, [locale, dispatch]);

  const COLORS = ["#0dff62", "#bbff33", "#5465ff", "#c37aff", "#fd78ff"];

  const genreBgColor = (index: number) => {
    const colorIndex = index % COLORS.length;
    return COLORS[colorIndex];
  };

  const onGenreMouseEnter = (genre: string) => {
    setSelectedGenre(genre);
  };

  const onGenreMouseLeave = () => {
    setSelectedGenre(null);
  };

  const moveDown = () => {
    // Scroll down 500px

    window.scrollBy({
      top: 500,
      behavior: "smooth",
    });
  };

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
                onClick={moveDown}
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
              className="mx-2 gradient-text text-5xl font-serif-bold"
              style={{
                fontWeight: 600,
              }}
            >
              {genres.length}
            </span>
            {commonScopedT("genres")}
          </h3>

          <motion.div
            className="home-page__generes-list flex flex-row flex-wrap mt-[3rem] justify-evenly"
            layout
            transition={{ type: "spring", duration: 0.4, bounce: 0.05 }}
            onMouseLeave={onGenreMouseLeave}
          >
            {genres.map((genre, index) => (
              <motion.div
                key={genre.id}
                className={`genre-card flex flex-col rounded-md px-4 py-4 mr-4 mb-4 text-background min-w-[31%] relative pb-[2rem]`}
                style={{
                  backgroundColor: genreBgColor(index),
                }}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", duration: 0.4, bounce: 0.05 }}
                onMouseEnter={() => onGenreMouseEnter(genre.genre)}
                layout
              >
                {selectedGenre === genre.genre && (
                  <motion.div
                    className="genre-card__overlay absolute w-[calc(100%+6px)] h-[calc(100%+6px)] top-[3px] left-[3px] flex flex-col justify-center items-center -z-10 border border-spring-green-500 bg-brilliant rounded-md"
                    layoutId="genre-card-overlay"
                    layout
                  >
                    <span className="text-2xl font-bold text-background">
                      {genre.genre}
                    </span>
                  </motion.div>
                )}
                <Link href={`/${locale}/genres/${encodeURI(genre.id)}`}>
                  <div className="flex flex-row justify-between">
                    <span
                      className="text-base font-sans inline-block mr-4"
                      style={{ fontWeight: 200, fontSize: "0.75rem" }}
                    >
                      {genre.description}
                    </span>
                    <div className="flex flex-col justify-start items-center">
                      <span
                        className="text-base"
                        style={{ fontSize: "0.75rem" }}
                      >
                        {genre.count ?? 0}
                      </span>
                      <span
                        className="text-base"
                        style={{ fontSize: "0.75rem" }}
                      >
                        books
                      </span>
                    </div>
                  </div>
                  <span
                    className="text-2xl font-bold font-serif"
                    style={{
                      fontWeight: 200,
                      fontSize: "1.25rem",
                    }}
                  >
                    {genre.genre}
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </ReactLenis>
  );
}
