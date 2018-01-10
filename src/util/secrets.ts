import logger from "./logger";
import * as dotenv from "dotenv";
import * as  fs from "fs";

if (fs.existsSync(".env")) {
    logger.debug("Using .env file to supply config environment variables");
    dotenv.config({ path: ".env" });
} else if (fs.existsSync(".env.example")) {
    logger.debug("Using .env.example file to supply config environment variables");
    dotenv.config({ path: ".env.example" });  // you can delete this after you create your own .env file!
} else {
    logger.error("This project requires a .env file to configure environment variables");
}
export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === "production"; // Anything else is treated as 'dev'

// Delete this after you've added a database to the project
if (process.env["NO_DATABASE_SETUP"] === "true") {
    logger.debug(`No database detected. Either follow steps in the README to set up a MongoDB,
    or delete the NO_DATABASE_SETUP setting from your .env settings file if you already have one setup.`);
}
export const SESSION_SECRET = process.env["SESSION_SECRET"];
export const MONGODB_URI = prod ? process.env["MONGODB_URI"] : process.env["MONGODB_URI_LOCAL"];

if (!SESSION_SECRET) {
    logger.error("No client secret. Set SESSION_SECRET environment variable.");
    process.exit(1);
}

if (!MONGODB_URI) {
    logger.error("No mongo connection string. Set MONGODB_URI environment variable.");
    process.exit(1);
}
