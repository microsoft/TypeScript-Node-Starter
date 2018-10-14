import { HomeController } from "../controllers/home";
import { Provider } from "../core/provider";
import { RequestHandler } from "express";
import { Express } from "express-serve-static-core";
import { HttpMethod } from "../core/http";

export class RouteHandler {
  private static provider = Provider.getDefaultProvider();
  private static Routes: Array<Route>  = [];

  public static createRoute(name: string, method: HttpMethod, path: string, middlewares: any[]) {
    const route = new Route(name, method, path, middlewares);
    this.Routes.push(route);
  }

  public static RegisterToExpress(express: Express) {
    this.Routes.forEach(route => {
      debugger;

      const instanceProps = route.name.split("-");
      const instance: any = this.provider.get(Symbol(instanceProps[0]));
      const method: string = instanceProps[1];
      const middlewares = route.middlewares;
      middlewares.push(instance[method]);

      switch (route.method) {
        case HttpMethod.GET:
          express.get(route.path, middlewares);
        break;
        case HttpMethod.POST:
          express.post(route.path, middlewares);
        break;
        case HttpMethod.PUT:
          express.put(route.path, middlewares);
        break;
        case HttpMethod.DELETE:
          express.delete(route.path, middlewares);
        break;
        default:
          express.get(route.path, middlewares);
        break;
      }
    });
  }

  public static GetAllRoutes(): Array<Route> {
    return this.Routes;
  }
}
class Route {
  name: string;
  method: HttpMethod;
  path: string;
  middlewares: Array<RequestHandler>;
  constructor(name: string, method: HttpMethod, path: string, middlewares: Array<RequestHandler>) {
    this.name = name;
    this.method = method;
    this.path = path;
    this.middlewares = middlewares;
  }
}