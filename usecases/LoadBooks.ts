import BookRepository from "@adapters/repositories/BookRepository";
import { TYPES } from "../types/index";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import type { ILogger } from "./Logging";
import type { IMetrics } from "./SimpleMetrics";

export type LoadBooksInput = {
  count: number;
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
      const { count } = params;
      return this._bookRepository.loadBooks(count);
    } catch (e) {
      this._logger.error(JSON.stringify(e as any), "Error loading books");
      return [];
    } finally {
      endTimer();
    }
  }
}
