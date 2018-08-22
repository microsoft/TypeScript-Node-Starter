import { App } from "./app";

class Server {
  app: App;
  port: number;
  constructor() {
    this.port = Number.parseInt(process.env.PORT) || 3000;
    const env = process.env.NODE_ENV || "development";
    this.app = App.getApp(env);
  }
  run = async () => {
    await this.app.listen(this.port);
    await this.app.execute();
  };
}

new Server().run();
