import mongoose from "mongoose";
export interface User extends mongoose.Document {
  email: string;
  password: string;
  passwordResetToken: string;
  passwordResetExpires: Date;
  facebook: string;
  tokens: AuthToken[];
  profile: {
    name: string;
    gender: string;
    location: string;
    website: string;
    picture: string;
  };
  comparePassword: comparePasswordFunction;
  gravatar: (size: number) => string;
}
export type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;
export interface AuthToken {
  accessToken: string;
  kind: string;
}

