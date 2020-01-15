import logger from "./logger";
import dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(".env")) {
    logger.debug("Using .env file to supply config environment variables");
    dotenv.config({ path: ".env" });
} else {
    logger.debug("Using .env.example file to supply config environment variables");
    dotenv.config({ path: ".env.example" }); // you can delete this after you create your own .env file!
}

export const NODE_ENV_PROD = "production";
export const NODE_ENV_DEV = "development";
export const NODE_ENV_LOCAL = "local";
export const NODE_ENV_TEST = "test";
const nodeEnv = process.env.NODE_ENV;
if (!nodeEnv) {
    logger.error("No node environment set. Set NODE_ENV environment variable.");
    process.exit(1);
}
export const NODE_ENV = nodeEnv as string;
console.log(`NODE_ENV=${NODE_ENV}`);

if (!([NODE_ENV_PROD, NODE_ENV_DEV, NODE_ENV_LOCAL, NODE_ENV_TEST].includes(NODE_ENV))) {
    logger.error(`Node environment is not set to a valid value. NODE_ENV=[${NODE_ENV}] Set NODE_ENV environment variable ` +
        `to one of the following values [${NODE_ENV_PROD}, ${NODE_ENV_DEV}, ${NODE_ENV_LOCAL}, ${NODE_ENV_TEST}]`
        );
    process.exit(1);
}
export const NODE_ENV_IS_PROD = NODE_ENV === NODE_ENV_PROD;
export const NODE_ENV_IS_DEV = NODE_ENV === NODE_ENV_DEV;
export const NODE_ENV_IS_LOCAL = NODE_ENV === NODE_ENV_LOCAL;

const sessionSecret = process.env["SESSION_SECRET"];
if (!sessionSecret) {
    logger.error("No client secret. Set SESSION_SECRET environment variable.");
    process.exit(1);
}
export const SESSION_SECRET: string = sessionSecret as string;


const mongodbUriProd = process.env["MONGODB_URI_PROD"];
if (!mongodbUriProd) {
    logger.error("No mongo connection string. Set MONGODB_URI_PROD environment variable.");
}
export const MONGODB_URI_PROD = mongodbUriProd as string;

const mongodbUriLocal = process.env["MONGODB_URI_LOCAL"];
if (!mongodbUriLocal) {
    logger.error("No mongo connection string. Set MONGODB_URI_LOCAL environment variable.");
}
export const MONGODB_URI_LOCAL = mongodbUriLocal as string;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const MONGODB_URI = NODE_ENV_IS_PROD ? MONGODB_URI_PROD : MONGODB_URI_LOCAL;

const facebookId = process.env.FACEBOOK_ID;
if (!facebookId) {
    logger.error("No facebook id. Set FACEBOOK_ID environment variable.");
    process.exit(1);
}
export const FACEBOOK_ID = facebookId as string;

const facebookSecret = process.env.FACEBOOK_SECRET;
if (!facebookSecret) {
    logger.error("No facebook secret. Set FACEBOOK_SECRET environment variable.");
    process.exit(1);
}
export const FACEBOOK_SECRET = facebookSecret as string;

const sendgridUser = process.env.SENDGRID_USER;
if (!sendgridUser) {
    logger.error("No sendgrid user. Set SENDGRID_USER environment variable.");
    process.exit(1);
}
export const SENDGRID_USER = sendgridUser as string;

const sendgridPassword = process.env.SENDGRID_PASSWORD;
if (!sendgridPassword) {
    logger.error("No sendgrid password. Set SENDGRID_PASSWORD environment variable.");
    process.exit(1);
}
export const SENDGRID_PASSWORD = sendgridPassword as string;

