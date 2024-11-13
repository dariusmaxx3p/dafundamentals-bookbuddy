"use client";

import { Book } from "@entities/Book";
import { motion } from "framer-motion";

export default function BookItem(props: { book: Book; index: number }) {
  const { book } = props;
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.25,
        type: "spring",
        bounce: 0.05,
      }}
      whileHover={{ scale: 1.05 }}
      layoutId={book.id}
      className="book-item flex flex-col w-[30%] px-2 pt-4 rounded-sm hover:shadow-sm mr-4 mb-4 h-[600px]"
      layout
    >
      <motion.div className="flex flex-col justify-center items-center w-[60%] self-center overflow-hidden">
        <motion.img
          src={book.cover}
          alt={`title: ${book.title}`}
          className="book-item__cover w-full object-cover"
        />
      </motion.div>
      <motion.div className="flex flex-col w-[75%] self-center px-4">
        <motion.h1 className="font-serif text-xl text-center my-4 text-indigo-500">
          {props.book.title}
        </motion.h1>
        <p className="text-base font-mono my-2">
          by:{" "}
          <span className="text-green-500">{props.book.authors.join(",")}</span>
        </p>
        <p className="text-base font-mono mt-2">{props.book.description}</p>
      </motion.div>
    </motion.div>
  );
}
