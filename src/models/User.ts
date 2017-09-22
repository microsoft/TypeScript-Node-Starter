import * as bcrypt from "bcrypt-nodejs";
import * as crypto from "crypto";
import * as mongoose from "mongoose";

export type UserModel = mongoose.Document & {
  fName: string,
  lName: string,
  email: string,
  username: string,
  school: string,
  password: string,
  pNumber: string,
  degrees: Degree[],
  courses: Course[],
  passwordResetToken: string,
  passwordResetExpires: Date,

  comparePassword: (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void,
  gravatar: (size: number) => string
};

export type AuthToken = {
  accessToken: string,
  kind: string
};

export type Degree = {
  level: string,
  name: string
};

export type Course = {
  number: number,
  name: string,
  crnNumber: number,
  section: string,
  startTime: number,
  endTime: number,
  professor: string[]
};

const userSchema = new mongoose.Schema({
  fName: String,
  lName: String,
  email: { type: String, unique: true },
  username: { type: String, unique: true },
  school: String,
  password: String,
  pNumber: String,
  year: String,
  degrees: Array,
  courses: Array,
  passwordResetToken: String,
  passwordResetExpires: Date,
}, { timestamps: true });

/**
 * Password hash middleware.
 */
userSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, undefined, (err: mongoose.Error, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword: string, cb: (err: any, isMatch: any) => {}) {
  bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
    cb(err, isMatch);
  });
};


/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function (size: number) {
  if (!size) {
    size = 200;
  }
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto.createHash("md5").update(this.email).digest("hex");
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

// export const User: UserType = mongoose.model<UserType>('User', userSchema);
const User = mongoose.model("User", userSchema);
export default User;