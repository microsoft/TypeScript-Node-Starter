import { HttpMethod } from "./http";
import { RequestHandler } from "express-serve-static-core";
import { Provider } from "./provider";
import { RouteHandler } from "./routeHandler";

export const route = (method: HttpMethod, path: string, ...middlewares: any[]) => {
  return (target: any, propertyKey: string, descriptor?: PropertyDescriptor) => {
    RouteHandler.createRoute(target.constructor.name + "-" + propertyKey, method, path, middlewares || []);
  };
};