import BookRepository from "@adapters/repositories/BookRepository";
import { TYPES } from "../types/index";
import { inject, injectable } from "inversify";

export type LoadBooksInput = {
  count: number;
};

@injectable()
export class LoadBooks {

  _bookRepository: BookRepository;

  constructor(
    @inject(TYPES.BOOK_REPOSITORY) bookRepository: BookRepository
  ) {
    this._bookRepository = bookRepository;
  }

  async execute(params: LoadBooksInput) {
    const { count } = params;
    return this._bookRepository.loadBooks(count);
  }
}
