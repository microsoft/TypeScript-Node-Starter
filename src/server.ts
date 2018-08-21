import { App } from "./app";

class Server {
  app: App;
  constructor() {
    const port = Number.parseInt(process.env.PORT) || 3000;
    const env = process.env.NODE_ENV || "development";
    this.app = new App(port, env);
  }
  run = async () => {
    await this.app.listen();
    await this.app.execute();
  };
}

new Server().run();
