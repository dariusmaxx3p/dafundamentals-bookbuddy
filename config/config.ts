import BookRepository from "@adapters/repositories/BookRepository";
import { TYPES } from "../types/index";
import { Container } from "inversify";
import ResponsePresenter from "@adapters/presenters/ResponsePresenter";
import { LoadBooks } from "@usecases/LoadBooks";
import { ILogger, WinstonLogger } from "@usecases/Logging";
import { IMetrics, SimpleMetrics } from "@usecases/SimpleMetrics";
import GenresRepository from "@adapters/repositories/GenresRepository";
import GetGenres from "@usecases/GetGenres";

const bookBuddyContainer = new Container();

// Utils
bookBuddyContainer
  .bind<ILogger>(TYPES.LOGGER)
  .to(WinstonLogger)
  .inSingletonScope();
bookBuddyContainer
  .bind<IMetrics>(TYPES.METRICS)
  .to(SimpleMetrics)
  .inSingletonScope();

// Repositories
bookBuddyContainer
  .bind<BookRepository>(TYPES.BOOK_REPOSITORY)
  .to(BookRepository)
  .inSingletonScope();
bookBuddyContainer
  .bind<GenresRepository>(TYPES.GENRES_REPOSITORY)
  .to(GenresRepository)
  .inSingletonScope();

// Use cases
bookBuddyContainer
  .bind<ResponsePresenter>(TYPES.RESPONSE_PRESENTER)
  .to(ResponsePresenter);
bookBuddyContainer.bind<LoadBooks>(TYPES.LOAD_BOOKS).to(LoadBooks);
bookBuddyContainer.bind<GetGenres>(TYPES.GET_GENRES).to(GetGenres);

export { bookBuddyContainer };
