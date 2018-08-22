import { Provider } from "./provider";
import { RouteHandler } from "./routeHandler";

export function app(value: any) {
  return function(constructor: any) {
      debugger;
      const controllers = value.controllers;
      if (controllers && controllers.length > 0) {
        controllers.forEach( (controller: any)  => {
          Provider.getDefaultProvider().register(Symbol(controller.name), controller);
        });
      }

      const express = value.express.provider;
      constructor.prototype.express = express;
      const middlewares = value.express.middlewares;
      const setters = value.express.setters;

      for (const key in setters) {
        express.set(key, setters[key]);
      }

      if (middlewares && middlewares.length > 0) {
        middlewares.forEach( (middleware: any) => {
          express.use(middleware);
        });
      }

      RouteHandler.RegisterToExpress(express);

  };
}