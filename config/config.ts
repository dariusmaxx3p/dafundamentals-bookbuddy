import BookRepository from "@adapters/repositories/BookRepository";
import { TYPES } from "../types/index";
import { Container } from "inversify";
import ResponsePresenter from "@adapters/presenters/ResponsePresenter";
import { LoadBooks } from "@usecases/LoadBooks";


const bookBuddyContainer = new Container();

bookBuddyContainer.bind<BookRepository>(TYPES.BOOK_REPOSITORY).to(BookRepository).inSingletonScope();
bookBuddyContainer.bind<ResponsePresenter>(TYPES.RESPONSE_PRESENTER).to(ResponsePresenter);
bookBuddyContainer.bind<LoadBooks>(TYPES.LOAD_BOOKS).to(LoadBooks);

export { bookBuddyContainer };