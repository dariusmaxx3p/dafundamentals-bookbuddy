import { bookBuddyContainer } from "@/config/config";
import { TYPES } from "../../../types";
import { LoadBooks } from "@usecases/LoadBooks";
import ResponsePresenter from "@adapters/presenters/ResponsePresenter";
import { Book } from "@entities/Book";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const count = Number(searchParams.get("count"));

  const loadBook = bookBuddyContainer.get<LoadBooks>(TYPES.LOAD_BOOKS);

  const books = await loadBook.execute({ count });
  return Response.json(ResponsePresenter.json<Book[]>(books));
}
