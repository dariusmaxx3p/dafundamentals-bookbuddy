import { Book } from "@entities/Book";
import path from "path";
import { promises as fs } from "fs";
import "reflect-metadata";
import { inject, injectable } from "inversify";
import { TYPES } from "@/types";
import type { ILogger } from "@usecases/Logging";
import type { IMetrics } from "@usecases/SimpleMetrics";

@injectable()
export default class BookRepository {
  private books: Book[] = [];
  private BOOK_FOLDER_PATH = path.join(process.cwd(), "./data/books");
  constructor(
    @inject(TYPES.LOGGER) private logger: ILogger,
    @inject(TYPES.METRICS) private metrics: IMetrics
  ) {}

  async loadBooks(count: number) {
    const endTimer = this.metrics.startTimer("loadBooks");
    try {
      if (count < this.books.length) {
        return this.books.slice(0, count);
      }

      this.books = [];
      const numFiles = Math.ceil(count / 1000);
      for (let i = 0; i < numFiles; i++) {
        const bookPath = path.join(this.BOOK_FOLDER_PATH, `books-${i}.json`);
        const books = JSON.parse(await fs.readFile(bookPath, "utf-8"));
        this.books = this.books.concat(books);
      }

      return this.books.slice(0, count);
    } catch (e) {
      this.logger.error((e as Error).message);
      return [];
    } finally {
      endTimer();
    }
  }

  async loadBooksFromTo(start: number, end: number) {
    const endTimer = this.metrics.startTimer("loadBooksFromTo");
    try {
      if (end < this.books.length) {
        return this.books.slice(start, end);
      }

      this.books = [];
      const numFiles = Math.ceil(end / 1000);
      for (let i = 0; i < numFiles; i++) {
        const bookPath = path.join(this.BOOK_FOLDER_PATH, `books-${i}.json`);
        const books = JSON.parse(await fs.readFile(bookPath, "utf-8"));
        this.books = this.books.concat(books);
      }

      return this.books.slice(start, end);
    } catch (e) {
      this.logger.error((e as Error).message);
      return [];
    } finally {
      endTimer();
    }
  }

  async loadBooksPage(page: number, pageSize: number) {
    const endTimer = this.metrics.startTimer("loadBooksPage");
    try {
      if (page < 1) {
        page = 1;
      }
      const start = (page - 1) * pageSize;
      const end = page * pageSize;
      return this.loadBooksFromTo(start, end);
    } catch (e) {
      this.logger.error((e as Error).message);
      return [];
    } finally {
      endTimer();
    }
  }
}
