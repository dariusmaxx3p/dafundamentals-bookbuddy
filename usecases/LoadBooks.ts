import BookRepository from "@adapters/repositories/BookRepository";

export type LoadBooksInput = {
  count: number;
};

export class LoadBooks {
  constructor(private bookRepository: BookRepository) {}

  async execute(params: LoadBooksInput) {
    const { count } = params;
    return this.bookRepository.loadBooks(count);
  }
}
