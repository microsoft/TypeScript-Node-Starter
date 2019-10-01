import {UserDocument} from "../models/User";
import {NextFunction, Request, Response} from "express";

declare module 'express' {
	export interface User extends UserDocument {}
	export interface Request {
		user?: User;
	}
}