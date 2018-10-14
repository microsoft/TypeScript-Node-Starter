import passport from "passport";
import { Request, Response } from "express";
import { route } from "../core/route";
import { HttpMethod } from "../core/http";

export class OAuth {

  @route(HttpMethod.GET, "/auth/facebook", passport.authenticate("facebook", { scope: ["email", "public_profile"] }))
  getFacebookAuth = async(req: Request, res: Response) => {

  }

  @route(HttpMethod.GET, "/auth/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/login" }))
  getFacebookCallback = async(req: Request, res: Response) => {
    res.redirect(req.session.returnTo || "/");
  }

}