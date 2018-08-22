import { HttpMethod } from "./http";
import { RequestHandler } from "express-serve-static-core";
import { Provider } from "./provider";
import { RouteHandler } from "./routeHandler";

export function route(method: HttpMethod, path: string, ...middlewares: any[]) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    if (!middlewares) middlewares = [];
    middlewares.push(target[propertyKey]);

    RouteHandler.createRoute(target.constructor.name + "-" + propertyKey, method, path, middlewares);
  };
}
