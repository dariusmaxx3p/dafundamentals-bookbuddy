import { bookBuddyContainer } from "@/config/config";
import { TYPES } from "@/types";
import ResponsePresenter from "@adapters/presenters/ResponsePresenter";
import GetGenres from "@usecases/GetGenres";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const locale = url.searchParams.get("locale") ?? "en";
  const getGeners = bookBuddyContainer.get<GetGenres>(TYPES.GET_GENRES);

  const genres = await getGeners.execute({ locale });

  return Response.json(ResponsePresenter.json(genres));
}
