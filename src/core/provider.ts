import * as controllers from "../controllers";

export class Provider {
  private constructor() {}
  private static _provider: Provider;
  private _instances: Array<InstanceType> = [];

  public static getDefaultProvider(): Provider {
    if (!Provider._provider) {
      Provider._provider = new Provider();
    }
    return Provider._provider;
  }

  register<T>(name: Symbol, TClass: { new(): T }) {
    const t = new TClass();
    if (this._instances.findIndex(x => x.name.toString() == name.toString()) <= 0 ) {
      this._instances.push(new InstanceType(name, t));
    }
  }

  get<T>(name: Symbol): T {
    if (!this._instances) return undefined;
    const instanceType = this._instances.find(x => x.name.toString() == name.toString());
    return instanceType ? instanceType.instance : undefined;
  }
}

class InstanceType {
  name: Symbol;
  instance: any;
  constructor(name: Symbol, instance: any) {
    this.name = name;
    this.instance = instance;
  }
}