import express from "express";
import { Express, Request, Response } from "express-serve-static-core";
import compression from "compression";  // compresses requests
import session from "express-session";
import bodyParser from "body-parser";
import errorHandler from "errorhandler";
import logger from "./util/logger";
import lusca from "lusca";
import dotenv from "dotenv";
import mongo from "connect-mongo";
import flash from "express-flash";
import path from "path";
import mongoose from "mongoose";
import passport from "passport";
import expressValidator from "express-validator";
import bluebird from "bluebird";
import { MONGODB_URI, SESSION_SECRET } from "./util/secrets";

// Controllers (route handlers)
import { HomeController, API, ContactController, UserController, OAuth } from "./controllers";

import { Provider } from "./core/provider";
import { app } from "./core/app";

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
      session({ resave: true, saveUninitialized: true, secret: SESSION_SECRET }),
      passport.initialize(), passport.session(), flash(), lusca.xframe("SAMEORIGIN"), lusca.xssProtection(true),
      (req: Request, res: Response, next: any) => { res.locals.user = req.user; next(); },
      (req: Request, res: Response, next: any) => {
        // After successful login, redirect back to the intended page
        if (!req.user &&
          req.path !== "/login" &&
          req.path !== "/signup" &&
          !req.path.match(/^\/auth/) &&
          !req.path.match(/\./)) {
          req.session.returnTo = req.path;
        } else if (req.user &&
          req.path == "/account") {
          req.session.returnTo = req.path;
        }
        next();
      },
      express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
    ]
  }
})
export class App {
  private _express: Express;
  private env: string;
  private appState: string;

  get express(): Express { return this._express; }
  set express(value: Express) { this._express = value; }

  private constructor() { }

  private static _app: App = undefined;
  static getApp(env: string): App {
    if (!this._app) {
      this._app = new App();
      this._app.env = env;
    }
    return this._app;
  }

  execute = async () => {
    if (this.appState == "executed") return;

    const MongoStore = mongo(session);

    // Load environment variables from .env file, where API keys and passwords are configured
    dotenv.config({ path: ".env.example" });

    // Connect to MongoDB
    const mongoUrl = MONGODB_URI;
    (<any>mongoose).Promise = bluebird;
    mongoose.connect(mongoUrl, {useMongoClient: true}).then(
      () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
    ).catch(err => {
      console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
      // process.exit();
    });

    this.appState = "executed";
  }

  async listen(port: number) {
    const promise = await new Promise((resolve, reject) => {
      this.express.listen(port, () => {
        console.log(
          "  App is running at http://localhost:%d in %s mode",
          port,
          this.env
        );
        console.log("  Press CTRL-C to stop\n");
        resolve();
      });
    });
    return promise;
  }

}