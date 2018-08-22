import express from "express";
import { Express, Request, Response } from "express-serve-static-core";
import compression from "compression";  // compresses requests
import session from "express-session";
import bodyParser from "body-parser";
import errorHandler from "errorhandler";
import logger from "./util/logger";
import lusca from "lusca";
import dotenv from "dotenv";
import flash from "express-flash";
import path from "path";
import mongoose from "mongoose";
import passport from "passport";
import expressValidator from "express-validator";
import { MONGODB_URI, SESSION_SECRET } from "./util/secrets";

// Controllers (route handlers)
import { HomeController, API, ContactController, UserController, OAuth } from "./controllers";

import { Provider } from "./core/provider";
import { app } from "./core/app";
import { DBSetup, store } from "./db/setup";
import { LoginGuard } from "./middlewares";

@app({
  controllers: [HomeController, API, ContactController, UserController, OAuth], // Add new controllers here to register
  express: {
    provider : express(),
    setters: {
      "views" :  path.join(__dirname, "../views"),
      "view engine" : "pug"
    },
    middlewares: [
      errorHandler(), compression(), bodyParser.json(), bodyParser.urlencoded({ extended: true }), expressValidator(),
      session({ resave: true, saveUninitialized: true, secret: SESSION_SECRET, store: store }),
      passport.initialize(), passport.session(), flash(), lusca.xframe("SAMEORIGIN"), lusca.xssProtection(true),
      (req: Request, res: Response, next: any) => { res.locals.user = req.user; next(); },
      new LoginGuard().index(),
      express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
    ]
  }
})
export class App {
  private _express: Express;
  private env: string;
  private appState: string;
  private static _app: App = undefined;

  private constructor() { }
  get express(): Express { return this._express; }
  set express(value: Express) { this._express = value; }

  static getApp(env: string): App {
    if (!this._app) {
      this._app = new App();
      this._app.env = env;
    }
    return this._app;
  }

  execute = async () => {
    if (this.appState == "executed") return;

    // Load environment variables from .env file, where API keys and passwords are configured
    dotenv.config({ path: ".env.example" });
    DBSetup.Initialize();
    this.appState = "executed";
  }

  listen = async (port: number) => {
    const promise = await new Promise((resolve, reject) => {
      this.express.listen(port, () => {
        console.log("  App is running at http://localhost:%d in %s mode", port, this.env );
        console.log("  Press CTRL-C to stop\n");
        resolve();
      });
    });
    return promise;
  }

}