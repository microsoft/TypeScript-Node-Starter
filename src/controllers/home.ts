import { Request, Response } from "express";
/**
 * GET /
 * Home page.
 */
class Home {
  public index(req: Request, res: Response) {
    res.render("home", {
      title: "Home"
    });
  }
}

const home = new Home();
export default home;
