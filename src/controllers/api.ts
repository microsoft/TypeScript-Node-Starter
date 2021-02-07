import graph from "fbgraph";
import { Response, Request, NextFunction } from "express";


/**
 * List of API examples.
 * @route GET /api
 */
export const getApi = (req: Request, res: Response) => {
    res.render("api/index", {
        title: "API Examples"
    });
};

/**
 * Facebook API example.
 * @route GET /api/facebook
 */
export const getFacebook = (req: Request, res: Response, next: NextFunction) => {
    const token = req.user.tokens.find(token => token.kind === "facebook");
    graph.setAccessToken(token.accessToken);
    graph.get(`${req.user.facebook}?fields=id,name,email,first_name,last_name,gender,link,locale,timezone`, (err: Error, results: graph.FacebookUser) => {
        if (err) { return next(err); }
        res.render("api/facebook", {
            title: "Facebook API",
            profile: results
        });
    });
};
