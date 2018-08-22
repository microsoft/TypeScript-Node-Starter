import { Request, Response, NextFunction } from "express";

export class LoginGuard {
  index = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
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
    };
  };
}