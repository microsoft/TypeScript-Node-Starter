"use strict";

import async from "async";
import request from "request";
import graph from "fbgraph";
import { Response, Request, NextFunction } from "express";
import { route } from "../core/route";
import { HttpMethod } from "../core/http";
import * as passportConfig from "../config/passport";

export class API {

  @route(HttpMethod.GET, "/api")
  async get(req: Request, res: Response) {
    res.render("api/index", {
      title: "API Examples"
    });
  }

  @route(HttpMethod.GET, "/api/facebook", passportConfig.isAuthenticated, passportConfig.isAuthorized)
  getFacebook = async(req: Request, res: Response, next: NextFunction) => {
    const token = req.user.tokens.find((token: any) => token.kind === "facebook");
    graph.setAccessToken(token.accessToken);
    graph.get(`${req.user.facebook}?fields=id,name,email,first_name,last_name,gender,link,locale,timezone`, (err: Error, results: graph.FacebookUser) => {
      if (err) { return next(err); }
      res.render("api/facebook", {
        title: "Facebook API",
        profile: results
      });
    });
  }
}