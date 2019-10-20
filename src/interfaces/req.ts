import { Request } from "express";
import { UserDocument } from "../models/User";

export interface Req extends Request {
  user: UserDocument;
}
