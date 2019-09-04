import express from 'express';
import { UserDocument } from '../models/User';

declare module 'express' {
  export interface User extends UserDocument {}
  export interface Request {
    user?: User;
  }
}
