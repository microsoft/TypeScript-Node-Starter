import errorHandler from "errorhandler";

import { App } from "./app";

class Server {
  app: App;
  constructor() {
    this.app = new App();
  }
  run = async () => {
    const promise = await new Promise((resolve, reject) => {
      /**
       * Error Handler. Provides full stack - remove for production
       */
      this.app.expressApp.use(errorHandler());

      this.app.expressApp.listen(this.app.expressApp.get("port"), () => {
        console.log(
          "  App is running at http://localhost:%d in %s mode",
          this.app.expressApp.get("port"),
          this.app.expressApp.get("env")
        );
        console.log("  Press CTRL-C to stop\n");
        this.app.Execute();
        resolve();
      });
    })
    .catch(err => {throw err; });
    return promise;
  };
}

new Server().run();
