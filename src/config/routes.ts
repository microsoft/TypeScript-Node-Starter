import { HomeController } from "../controllers/home";
import { Provider } from "../core/provider";
import { RequestHandler } from "express";

export class AppRoutes {
  private static provider = Provider.getDefaultProvider();
  private static Routes: Array<Route>  = [];
  public static RegisterAll() {
    this.Routes.push(new Route("get", "/", [this.provider.get<HomeController>(Symbol("HomeController")).get]));
  }

  public static GetAllRoutes(): Array<Route> {
    return this.Routes;
  }
}
export class Route {
  method: string;
  path: string;
  middlewares: Array<RequestHandler>;
  constructor(method: string, path: string, middlewares: Array<RequestHandler>) {
    this.method = method;
    this.path = path;
    this.middlewares = middlewares;
  }
}