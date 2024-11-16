import BookRepository from "@adapters/repositories/BookRepository";
import { TYPES } from "../types/index";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import type { ILogger } from "./Logging";
import type { IMetrics } from "./SimpleMetrics";
import { Book } from "@entities/Book";

export type LoadBooksInput = {
  count: number;
  from: number;
  to: number;
  page: number;
  pageSize: number;
};

export type LoadBooksOutput = {
  type: "count" | "from-to" | "page";
  books: Book[];
  prevPage?: number;
  nextPage?: number;
  totalPages?: number;
};

@injectable()
export class LoadBooks {
  _bookRepository: BookRepository;
  _metrics: IMetrics;
  _logger: ILogger;

  constructor(
    @inject(TYPES.BOOK_REPOSITORY) bookRepository: BookRepository,
    @inject(TYPES.LOGGER) logger: ILogger,
    @inject(TYPES.METRICS) metrics: IMetrics
  ) {
    this._bookRepository = bookRepository;
    this._metrics = metrics;
    this._logger = logger;
  }

  async execute(params: LoadBooksInput) {
    const endTimer = this._metrics.startTimer("LoadBooks");
    try {
      const { count, from, to, page, pageSize } = params;

      // Page is first priority
      if (page > 0 && pageSize > 0) {
        const books = await this._bookRepository.loadBooksPage(page, pageSize);
        return {
          type: "page",
          books,
          prevPage: Math.max(page - 1, 1),
          nextPage: page + 1,
          totalPages: Math.ceil(10_000 / pageSize),
        };
      }
      // From and To is second priority
      if (from > 0 && to > 0 && from < to) {
        const books = await this._bookRepository.loadBooksFromTo(from, to);
        return { type: "from-to", books };
      }
      // Count is third priority
      if (count > 0) {
        const books = await this._bookRepository.loadBooks(count);
        return { type: "count", books };
      }

      return { type: "count", books: [] };
    } catch (e) {
      this._logger.error(JSON.stringify(e as any), "Error loading books");
      return { type: "count", books: [] };
    } finally {
      endTimer();
    }
  }
}
