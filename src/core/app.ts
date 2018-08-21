import { Provider } from "./provider";

export function app(value: any) {
  return function(constructor: any) {
      debugger;
      console.log(constructor);
      const controllers = value.controllers;
      if (controllers && controllers.length > 0) {
        controllers.forEach( (controller: any)  => {
          Provider.getDefaultProvider().register(Symbol(controller.name), controller);
        });
      }
  };
}