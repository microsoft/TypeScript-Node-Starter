import express from "express";
import compression from "compression";  // compresses requests
import session from "express-session";
import bodyParser from "body-parser";
import lusca from "lusca";
import flash from "express-flash";
import path from "path";
import passport from "passport";
import bluebird from "bluebird";
import cors from "cors";

// Create Express server
//
const app = express();

// Express configuration
//
app.set("port", process.env.PORT || 8000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(compression());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

// CORS configuration
// 
if (["production"].indexOf(process.env.NODE_ENV) == -1) {
	app.use(cors());
}

// Cache configuration
// 
app.use(
    express.static(path.join(__dirname, "public"), { maxAge: 3600000 })
);

// For Endpoint Testing of StackBlend Editor
// 
import * as endpoint from "./controllers/Endpoint";

if (["staging", "production"].indexOf(process.env.NODE_ENV) == -1) {
	endpoint.clearRecentError();
	app.post("/endpoint/update/content", endpoint.updateContent);
	app.get("/endpoint/recent/error", endpoint.getRecentError);
	
	app.use((err, req, res, next) => {
    endpoint.addRecentError(err);
    next();
  });
}

// For StackBlend Routings & Controllers
// 
try {
	const route = require("./route");
	route.default(app);
} catch (error) {
	console.log("\x1b[31m", error, "\x1b[0m");
	endpoint.addRecentError(error);
}

export default app;