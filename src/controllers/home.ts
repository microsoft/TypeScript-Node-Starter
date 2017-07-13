import { Request, Response } from "express";
/**
 * GET /
 * Home page.
 */
export class Home {
  public index(req: Request, res: Response) {
    res.render("home", {
      title: "Home"
    });
  }
}

const homeController = new Home();
export default homeController;
