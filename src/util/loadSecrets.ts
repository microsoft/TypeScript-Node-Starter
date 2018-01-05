// import log from './logger'; TODO

export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === "production";

export const SESSION_SECRET = process.env["SESSION_SECRET"];
export const MONGODB_URI = prod ? process.env["MONGODB_URI"] : process.env["MONGODB_URI_LOCAL"];



// if (!GITHUB_CLIENT_SECRET) {
//     log.fatal("ERROR\tNo client secret. Set TCQ_GH_SECRET.");
//     process.exit(1);
// }

// if (!GITHUB_CLIENT_ID) {
//     log.fatal("ERROR\tNo client id. Set TCQ_GH_ID.");
//     process.exit(1);
// }

// if (!SESSION_SECRET) {
//     log.fatal("ERROR\tNo session secret. Set TCQ_SESSION_SECRET.");
//     process.exit(1);
// }

// if (!CDB_SECRET) {
//     log.fatal("ERROR\tNo CosmosDB secret. Set TCQ_CDB_SECRET.");
//     process.exit(1);
// }

// if (!AI_IKEY) {
//     log.fatal("ERROR\tNo Application Insights Instrumentation Key. Set TCQ_AI_IKEY.");
//     process.exit(1);
// }