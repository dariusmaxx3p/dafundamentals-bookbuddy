import { bookBuddyContainer } from "@/config/config";
import { TYPES } from "@/types";
import ResponsePresenter from "@adapters/presenters/ResponsePresenter";
import GetGenres from "@usecases/GetGenres";

export async function GET() {
  const getGeners = bookBuddyContainer.get<GetGenres>(TYPES.GET_GENRES);

  const genres = await getGeners.execute();

  return Response.json(ResponsePresenter.json(genres));
}
