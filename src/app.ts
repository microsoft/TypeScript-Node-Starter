import express from "express";
import compression from "compression";  // compresses requests
import session from "express-session";
import bodyParser from "body-parser";
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
import * as homeController from "./controllers/home";
import * as userController from "./controllers/user";
import * as apiController from "./controllers/api";
import * as contactController from "./controllers/contact";


// API keys and Passport configuration
import * as passportConfig from "./config/passport";



export class App {
  public expressApp = express();

  constructor() {
    this.expressApp.set("port", process.env.PORT || 3000);
  }

  Execute = async () => {
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

    this.expressApp.set("views", path.join(__dirname, "../views"));
    this.expressApp.set("view engine", "pug");
    this.expressApp.use(compression());
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: true }));
    this.expressApp.use(expressValidator());
    this.expressApp.use(session({
      resave: true,
      saveUninitialized: true,
      secret: SESSION_SECRET

    }));
    this.expressApp.use(passport.initialize());
    this.expressApp.use(passport.session());
    this.expressApp.use(flash());
    this.expressApp.use(lusca.xframe("SAMEORIGIN"));
    this.expressApp.use(lusca.xssProtection(true));
    this.expressApp.use((req, res, next) => {
      res.locals.user = req.user;
      next();
    });
    this.expressApp.use((req, res, next) => {
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

    this.expressApp.use(
      express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
    );

    /**
     * Primary app routes.
     */
    this.expressApp.get("/", homeController.index);
    this.expressApp.get("/login", userController.getLogin);
    this.expressApp.post("/login", userController.postLogin);
    this.expressApp.get("/logout", userController.logout);
    this.expressApp.get("/forgot", userController.getForgot);
    this.expressApp.post("/forgot", userController.postForgot);
    this.expressApp.get("/reset/:token", userController.getReset);
    this.expressApp.post("/reset/:token", userController.postReset);
    this.expressApp.get("/signup", userController.getSignup);
    this.expressApp.post("/signup", userController.postSignup);
    this.expressApp.get("/contact", contactController.getContact);
    this.expressApp.post("/contact", contactController.postContact);
    this.expressApp.get("/account", passportConfig.isAuthenticated, userController.getAccount);
    this.expressApp.post("/account/profile", passportConfig.isAuthenticated, userController.postUpdateProfile);
    this.expressApp.post("/account/password", passportConfig.isAuthenticated, userController.postUpdatePassword);
    this.expressApp.post("/account/delete", passportConfig.isAuthenticated, userController.postDeleteAccount);
    this.expressApp.get("/account/unlink/:provider", passportConfig.isAuthenticated, userController.getOauthUnlink);

    /**
     * API examples routes.
     */
    this.expressApp.get("/api", apiController.getApi);
    this.expressApp.get("/api/facebook", passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getFacebook);

    /**
     * OAuth authentication routes. (Sign in)
     */
    this.expressApp.get("/auth/facebook", passport.authenticate("facebook", { scope: ["email", "public_profile"] }));
    this.expressApp.get("/auth/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/login" }), (req, res) => {
      res.redirect(req.session.returnTo || "/");
    });
  }
}