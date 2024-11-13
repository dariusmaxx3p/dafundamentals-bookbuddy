import ResponsePresenter from "@adapters/presenters/ResponsePresenter";
import BookRepository from "@adapters/repositories/BookRepository";
import { Book } from "@entities/Book";
import { LoadBooks } from "@usecases/LoadBooks";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const count = Number(searchParams.get("count"));

  const loadBooks = new LoadBooks(new BookRepository());
  const books = await loadBooks.execute({ count });

  const resPresenter = ResponsePresenter.json<Book[]>(books);
  return Response.json(resPresenter);
}
