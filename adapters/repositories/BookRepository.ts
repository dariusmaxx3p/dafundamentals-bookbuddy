import { Book } from "@entities/Book";
import path from "path";
import { promises as fs } from "fs";
import { injectable } from 'inversify';

@injectable()
export default class BookRepository {
  private books: Book[] = [];
  private BOOK_FOLDER_PATH = path.join(process.cwd(), "./data/books");
  constructor() { }

  async loadBooks(count: number) {
    this.books = [];
    const numFiles = Math.ceil(count / 1000);
    for (let i = 0; i < numFiles; i++) {
      const bookPath = path.join(this.BOOK_FOLDER_PATH, `books-${i}.json`);
      const books = JSON.parse(await fs.readFile(bookPath, "utf-8"));
      this.books = this.books.concat(books);
    }

    return this.books.slice(0, count);
  }
}
