"use client";

import { Book } from "@entities/Book";
import { ReactLenis } from "@studio-freight/react-lenis";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BookItem from "@components/ui/book";

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetch("/api/books?count=15")
      .then((res) => res.json())
      .then((data) => setBooks(data.data));
  }, []);

  return (
    <ReactLenis root>
      <motion.div
        className="home-page flex flex-row flex-wrap px-12 items-center justify-start"
        layout
      >
        {books.map((book, index) => (
          <BookItem key={book.id} book={book} index={index} />
        ))}
      </motion.div>
    </ReactLenis>
  );
}
