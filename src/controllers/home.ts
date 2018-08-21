import { Request, Response } from "express";
import { controller } from "../core/controller";

export class HomeController {

  get = (req: Request, res: Response) => {
    res.render("home", {
      title: "Home"
    });
  }
}
