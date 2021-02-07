import {UserDocument} from "../models/User";
import {Request} from "express";

declare module 'express' {
	export interface User extends UserDocument {}
	export interface Request {
		user?: User;
	}
}
