import mongoose from "mongoose";
export default interface User extends mongoose.Document {
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
export type comparePasswordFunction = (
  candidatePassword: string,
  cb: (err: mongoose.Error, isMatch: boolean) => void
) => void;
export interface AuthToken {
  accessToken: string;
  kind: string;
}

