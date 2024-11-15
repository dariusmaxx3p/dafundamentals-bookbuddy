
import ResponsePresenter from "@adapters/presenters/ResponsePresenter";
import loadConfigs, { Config } from "@/config/config-loader";

export async function GET() {
    const config = await loadConfigs();
    return Response.json(ResponsePresenter.json<Config>(config));
}
