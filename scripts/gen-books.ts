import { chunking, uuid } from "@/lib/utils";
import path from "path";
import { faker } from "@faker-js/faker";
import * as fs from "fs";
import { GENRES } from "@adapters/repositories/GenresRepository";

faker.seed(123);

const DATA_FOLDER = "./data";

// Temporarily disabled
export type Book = {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  cover: string;
  authors: string[];
  genres: string[];
  publishedDate: string;
  publisher: string;
  pageCount: number;
  edition: string;
  format: string;
  price?: number;
};

const COVER_PATHS = [
  "/covers/1.png",
  "/covers/2.png",
  "/covers/3.png",
  "/covers/4.png",
  "/covers/5.png",
  "/covers/6.png",
  "/covers/7.png",
  "/covers/8.png",
  "/covers/9.png",
  "/covers/10.png",
  "/covers/11.png",
  "/covers/12.png",
  "/covers/13.png",
  "/covers/14.png",
  "/covers/15.png",
];

const EDITIONS = ["1st", "2nd", "3rd", "4th"];
const FORMATS = ["Paperback", "Hardcover", "Ebook"];

const genres = Object.keys(GENRES);

export function createFakeBook(): Book {
  return {
    title: faker.lorem.words(Math.floor(Math.random() * 5) + 1),
    subtitle: faker.lorem.words(Math.floor(Math.random() * 10) + 1),
    description: faker.lorem.paragraphs(1),
    cover: COVER_PATHS[Math.floor(Math.random() * COVER_PATHS.length)],
    authors: [
      ...Array.from({ length: Math.floor(Math.random() * 3 + 1) }, () =>
        faker.person.fullName()
      ),
    ],
    edition: EDITIONS[Math.floor(Math.random() * EDITIONS.length)],
    format: FORMATS[Math.floor(Math.random() * FORMATS.length)],
    genres: [
      ...Array.from(
        { length: Math.floor(Math.random() * 3 + 1) },
        () => genres[Math.floor(Math.random() * Object.keys(genres).length)]
      ),
    ],
    publishedDate: faker.date.past().toISOString(),
    pageCount: Math.floor(Math.random() * 1000),
    publisher: faker.company.name(),
    id: uuid(),
    price: Math.floor(Math.random() * 300),
  };
}

export function generateBooks(
  count: number,
  chunkSize: number = 1000
): Book[][] {
  const books: Book[] = [];

  for (let i = 0; i < count; i++) {
    books.push(createFakeBook());
  }

  return chunking(books, chunkSize);
}

export function writeBooks(books: Book[], filename: string) {
  const BOOK_FOLDER = path.join(DATA_FOLDER, "books");
  const file = path.join(BOOK_FOLDER, filename);
  const data = JSON.stringify(books, null, 2);
  fs.writeFileSync(file, data);
  console.log(`Generated ${books.length} books in ${file}`);
}

export function genBooks() {
  const numberOfBooks = 10000;
  const chunkSize = 1000;
  const books = generateBooks(numberOfBooks, chunkSize);
  books.forEach((chunk, index) => {
    writeBooks(chunk, `books-${index}.json`);
  });

  // Save genre-books.json
  const allBooks: Book[] = books.flat();
  saveGenreBooks(allBooks);
}

function groupBooksByGenres(books: Book[]): { [key: string]: string[] } {
  const grouped: { [key: string]: string[] } = {};
  books.forEach((book) => {
    book.genres.forEach((genre) => {
      if (!grouped[genre]) {
        grouped[genre] = [];
      }
      grouped[genre].push(book.id);
    });
  });

  // Unique the book ids
  Object.keys(grouped).forEach((genre) => {
    grouped[genre] = [...new Set(grouped[genre])];
  });
  return grouped;
}

function saveGenreBooks(books: Book[]) {
  const grouped = groupBooksByGenres(books);
  const genres: {
    [key: string]: {
      count: number;
      books: string[];
    };
  } = {};

  Object.keys(grouped).forEach((genre) => {
    genres[genre] = {
      count: grouped[genre].length,
      books: grouped[genre],
    };
  });

  const data = JSON.stringify(genres, null, 2);
  const filename = "genre-books.json";
  const file = path.join(DATA_FOLDER, "genres", filename);

  fs.writeFileSync(file, data, "utf-8");
}

genBooks();
