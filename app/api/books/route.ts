import { bookBuddyContainer } from "@/config/config";
import { TYPES } from "../../../types";
import { LoadBooks } from "@usecases/LoadBooks";
import ResponsePresenter from "@adapters/presenters/ResponsePresenter";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const loadBook = bookBuddyContainer.get<LoadBooks>(TYPES.LOAD_BOOKS);
  const count = Number(searchParams.get("count") ?? "-1");
  const from = Number(searchParams.get("from") ?? "-1");
  const to = Number(searchParams.get("to") ?? "-1");
  const page = Number(searchParams.get("page") ?? "-1");
  const pageSize = Number(searchParams.get("pageSize") ?? "-1");

  const loadBooksResults = await loadBook.execute({
    count,
    from,
    to,
    page,
    pageSize,
  });

  return Response.json(
    ResponsePresenter.json<typeof loadBooksResults>(loadBooksResults)
  );
}
