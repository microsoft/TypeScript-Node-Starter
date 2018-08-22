import { MONGODB_URI, SESSION_SECRET } from "../util/secrets";
import mongoose from "mongoose";
import mongo  from "connect-mongo";
import session from "express-session";

export class DBSetup {
  static Initialize() {

    // (<any>mongoose).Promise = bluebird;
    mongoose.connect(MONGODB_URI, { useMongoClient: true });

    const con = mongoose.connection;

    con.on("error", (err) => {
      console.log("MongoDB Connection Error. Please make sure that MongoDB is running.", err.message);
      process.exit(1);
    });

    con.once("open", () => {
      console.log("Connected to Mongo DB!");
    });
  }
}

const MongoStore = mongo(session);

export const store = new MongoStore({
  url: MONGODB_URI,
  autoReconnect: true
});
