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
import { HomeController } from "./controllers";
import * as userController from "./controllers/user";
import * as apiController from "./controllers/api";
import * as contactController from "./controllers/contact";


// API keys and Passport configuration
import * as passportConfig from "./config/passport";
import { Provider } from "./core/provider";
import { AppRoutes } from "./config/routes";
import { app } from "./core/app";

@app({
  controllers: [HomeController]
})
export class App {
  private _express: Express;
  private port: number;
  private env: string;

  get express(): Express { return this._express; }

  constructor(port: number, env: string) {
    this._express = express();
    this.port = port;
    this.env = env;
    this.express.set("port", port);
  }

  execute = async () => {

    const MongoStore = mongo(session);

    // Load environment variables from .env file, where API keys and passwords are configured
    dotenv.config({ path: ".env.example" });

    // Create Express server


    // Connect to MongoDB
    const mongoUrl = MONGODB_URI;
    (<any>mongoose).Promise = bluebird;
    mongoose.connect(mongoUrl, {useMongoClient: true}).then(
      () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
    ).catch(err => {
      console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
      // process.exit();
    });


    // Express configuration

    /**
     * Error Handler. Provides full stack - remove for production
     */
      this.express.use(errorHandler());

    this.express.set("views", path.join(__dirname, "../views"));
    this.express.set("view engine", "pug");
    this.express.use(compression());
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(expressValidator());
    this.express.use(session({
      resave: true,
      saveUninitialized: true,
      secret: SESSION_SECRET

    }));
    this.express.use(passport.initialize());
    this.express.use(passport.session());
    this.express.use(flash());
    this.express.use(lusca.xframe("SAMEORIGIN"));
    this.express.use(lusca.xssProtection(true));
    this.express.use((req, res, next) => {
      res.locals.user = req.user;
      next();
    });
    this.express.use((req, res, next) => {
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
    });

    this.express.use(
      express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
    );

    // const provider = Provider.getDefaultProvider();
    // provider.register("home", HomeController);

    AppRoutes.RegisterAll();
    AppRoutes.GetAllRoutes().forEach(route => {
      switch (route.method) {
        case "get":
          this.express.get(route.path, route.middlewares);
        break;
        case "post":
          this._express.post(route.path, route.middlewares);
        break;
        case "put":
          this._express.put(route.path, route.middlewares);
        break;
        case "delete":
          this._express.delete(route.path, route.middlewares);
        break;
        default:
          this.express.get(route.path, route.middlewares);
        break;
      }
    });
    /**
     * Primary app routes.
     */
    // this.express.get("/", homeController.index);
    this.express.get("/login", userController.getLogin);
    this.express.post("/login", userController.postLogin);
    this.express.get("/logout", userController.logout);
    this.express.get("/forgot", userController.getForgot);
    this.express.post("/forgot", userController.postForgot);
    this.express.get("/reset/:token", userController.getReset);
    this.express.post("/reset/:token", userController.postReset);
    this.express.get("/signup", userController.getSignup);
    this.express.post("/signup", userController.postSignup);
    this.express.get("/contact", contactController.getContact);
    this.express.post("/contact", contactController.postContact);
    this.express.get("/account", passportConfig.isAuthenticated, userController.getAccount);
    this.express.post("/account/profile", passportConfig.isAuthenticated, userController.postUpdateProfile);
    this.express.post("/account/password", passportConfig.isAuthenticated, userController.postUpdatePassword);
    this.express.post("/account/delete", passportConfig.isAuthenticated, userController.postDeleteAccount);
    this.express.get("/account/unlink/:provider", passportConfig.isAuthenticated, userController.getOauthUnlink);

    /**
     * API examples routes.
     */
    this.express.get("/api", apiController.getApi);
    this.express.get("/api/facebook", passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getFacebook);

    /**
     * OAuth authentication routes. (Sign in)
     */
    this.express.get("/auth/facebook", passport.authenticate("facebook", { scope: ["email", "public_profile"] }));
    this.express.get("/auth/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/login" }), (req, res) => {
      res.redirect(req.session.returnTo || "/");
    });
  }

  async listen() {
    const promise = await new Promise((resolve, reject) => {
      this.express.listen(this.port, () => {
        console.log(
          "  App is running at http://localhost:%d in %s mode",
          this.port,
          this.env
        );
        console.log("  Press CTRL-C to stop\n");
        resolve();
      });
    });
    return promise;
  }
}