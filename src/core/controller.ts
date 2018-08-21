import { Provider } from "./provider";

export function controller(value: any) {
  return function<T extends { new(): {} }>(constructor: T) {
      console.log(constructor);
      Provider.getDefaultProvider().register(value.name, constructor);
  };
}