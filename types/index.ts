export const TYPES = {
  // Repositories
  BOOK_REPOSITORY: Symbol.for("BookRepository"),
  GENRES_REPOSITORY: Symbol.for("GenresRepository"),
  RESPONSE_PRESENTER: Symbol.for("ResponsePresenter"),

  // Use cases
  LOAD_BOOKS: Symbol.for("LoadBooks"),
  GET_GENRES: Symbol.for("GetGenres"),
  LOGGER: Symbol.for("Logger"),
  METRICS: Symbol.for("Metrics"),
};

export type Genre = {
  id: string;
  genre: string;
  description: string;
  count?: number;
};
