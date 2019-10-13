import winston from "winston";
import { NODE_ENV_IS_PROD }  from "../util/secrets";

const options: winston.LoggerOptions = {
    transports: [
        new winston.transports.Console({
            level: NODE_ENV_IS_PROD ? "error" : "debug",
        }),
        new winston.transports.File({ filename: "debug.log", level: "debug" })
    ]
};

const logger = winston.createLogger(options);

if (!NODE_ENV_IS_PROD) {
    logger.debug("Logging initialized at debug level");
}

export default logger;
