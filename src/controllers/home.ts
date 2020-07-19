import { Request, Response } from "express";

/**
 * @route   GET /
 * @desc    Home page.
 */
export const index = (req: Request, res: Response) => {
    res.render("home", {
        title: "Home"
    });
};
