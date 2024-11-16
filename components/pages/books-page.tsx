"use client";

import { BOOKS_URL } from "@/misc/constants";
import { Book } from "@entities/Book";
import { useCurrentLocale, useScopedI18n } from "@locales/client";
import { ReactLenis } from "@studio-freight/react-lenis";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BooksPage() {
  const commonScopedT = useScopedI18n("common");
  const bookScoptedT = useScopedI18n("books");
  const locale = useCurrentLocale();
  const [books, setBooks] = useState<Book[]>([]);
  const [hoverBook, setHoverBook] = useState<string>("");
  const [hoverPage, setHoverPage] = useState<number | "next" | "prev">(0);
  const [page, setPage] = useState<{
    currentPage: number;
    nextPage: number;
    prevPage: number;
    totalPages?: number;
  }>({
    currentPage: 1,
    nextPage: 2,
    prevPage: 0,
  });

  const pageSize = 12;
  const loadBooks = async (page: number) => {
    try {
      const booksPath = `${BOOKS_URL}?page=${page}&pageSize=${pageSize}`;
      const response = await fetch(booksPath);
      const data = (await response.json()).data;
      const books = data.books as Book[];
      const nextPage = data.nextPage as number;
      const prevPage = data.prevPage as number;
      const totalPages = data.totalPages as number;

      setBooks(books);
      setPage({ currentPage: page, nextPage, prevPage, totalPages });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadBooks(page.currentPage);
  }, []);

  const onBookMouseEnter = (book: Book) => {
    setHoverBook(book.id);
  };

  const onPageMouseEnter = (page: number | "next" | "prev") => {
    setHoverPage(page);
  };

  const onPageMouseLeave = () => {
    setHoverPage(0);
  };

  const range3Page = (currentPage: number, totalPages: number) => {
    if (currentPage === 1) {
      return [1, 2, 3, "..."];
    }
    if (currentPage === totalPages) {
      return ["...", totalPages - 2, totalPages - 1, totalPages];
    }
    return ["...", currentPage - 1, currentPage, currentPage + 1, "..."];
  };

  return (
    <ReactLenis root>
      <motion.div className="flex flex-col">
        <motion.h2
          className="self-center font-sans text-9xl gradient-text"
          style={{ fontWeight: 200, letterSpacing: "0.2rem" }}
        >
          {commonScopedT("books")}
        </motion.h2>
        <motion.span
          className="self-center font-san text-3xl text-green-200 mt-8"
          style={{
            fontWeight: 100,
            letterSpacing: "0.2rem",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {bookScoptedT("explore")}
        </motion.span>

        <motion.div
          className="books flex flex-row flex-wrap px-4 py-4 mt-12 items-center justify-center"
          layout
        >
          {books.map((book) => (
            <motion.div
              key={book.id}
              className="book flex flex-col w-[30%] mr-4 mb-4 px-4 py-4 rounded-lg shadow-lg relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              onHoverStart={() => onBookMouseEnter(book)}
            >
              <Link
                href={`/${locale}/books/${book.id}`}
                className="flex flex-col"
              >
                <motion.div className="w-3/4 self-center relative">
                  {hoverBook === book.id && (
                    <motion.div
                      className="absolute w-[calc(100%+5px)] h-[calc(100%+5px)] top-[5px] left-[5px] border border-green-yellow-500 -z-10 rounded-lg"
                      layout
                      layoutId="book-cover-hover"
                    ></motion.div>
                  )}
                  <motion.img
                    src={book.cover}
                    alt={book.title}
                    className="book-cover w-full rounded-lg object-cover"
                  />
                </motion.div>
                <motion.span className="book-title self-center font-serif mt-8 text-xl">
                  {book.title}
                </motion.span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="books__pagination flex flex-row w-3/4 self-center justify-center items-center mb-[3rem]"
          onMouseLeave={onPageMouseLeave}
          layout
        >
          {page.prevPage > 0 && (
            <motion.button
              className="pagination__prev border border-foreground px-4 py-2 rounded-md mr-4 relative flex flex-row items-center justify-center"
              onClick={() => loadBooks(page.prevPage)}
              whileHover={{ scale: 1.1 }}
              onHoverStart={() => onPageMouseEnter("prev")}
            >
              {hoverPage === "prev" && (
                <motion.div
                  className="absolute w-[24px] h-[24px] top-[-12px] left-[-12px] rounded-full bg-pink-500 z-[-100]"
                  layout
                  layoutId="page-hover"
                ></motion.div>
              )}
              <span>{commonScopedT("prev")}</span>
            </motion.button>
          )}
          {range3Page(
            page.currentPage,
            page.totalPages ?? Math.ceil(1000 / pageSize)
          ).map((pageItem: string | number, index) => (
            <motion.button
              key={index}
              className={`pagination__page border border-foreground px-4 py-2 rounded-md mr-4 relative flex flex-row items-center justify-center ${
                pageItem === page.currentPage
                  ? "bg-pink-500 text-background"
                  : ""
              }`}
              onClick={
                pageItem !== "..."
                  ? () => loadBooks(pageItem as number)
                  : undefined
              }
              onHoverStart={
                pageItem !== "..."
                  ? () => onPageMouseEnter(pageItem as number)
                  : undefined
              }
            >
              {hoverPage === pageItem && (
                <motion.div
                  className="absolute w-[24px] h-[24px] top-[-12px] left-[-12px] rounded-full bg-pink-500 z-[-100]"
                  layout
                  layoutId="page-hover"
                ></motion.div>
              )}
              <span>{pageItem}</span>
            </motion.button>
          ))}
          {page.nextPage <= (page.totalPages ?? Math.ceil(1000 / pageSize)) && (
            <motion.button
              className="pagination__next border border-foreground px-4 py-2 rounded-md mr-4 relative flex flex-row items-center justify-center"
              onClick={() => loadBooks(page.nextPage)}
              onHoverStart={() => onPageMouseEnter("next")}
            >
              {hoverPage === "next" && (
                <motion.div
                  className="absolute w-[24px] h-[24px] top-[-12px] left-[-12px] rounded-full bg-pink-500 z-[-100]"
                  layout
                  layoutId="page-hover"
                ></motion.div>
              )}
              <span>{commonScopedT("next")}</span>
            </motion.button>
          )}
        </motion.div>
      </motion.div>
    </ReactLenis>
  );
}
