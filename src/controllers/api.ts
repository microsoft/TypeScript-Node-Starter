"use strict";

import * as async from "async";
import * as request from "request";
import * as graph from "fbgraph";
import { Response, Request, NextFunction } from "express";

class API {
  constructor() {
  }

  /**
   * GET /api
   * List of API examples.
   */
  public getApi(req: Request, res: Response) {
    res.render("api/index", {
      title: "API Examples"
    });
  }
  /**
   * GET /api/facebook
   * Facebook API example.
   */
  public getFacebook(req: Request, res: Response, next: NextFunction) {
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
const api = new API();
export default api;

