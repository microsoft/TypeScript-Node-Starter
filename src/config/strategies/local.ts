import passport from "passport";
import request from "request";
import passportLocal from "passport-local";
import { User } from "../../models/User";
const localStrategy = passportLocal.Strategy;

export function initBasicStrategy() {
  passport.use(new localStrategy({ usernameField: "email" }, (email, password, done) => {
    User.findOne({ email: email.toLowerCase() }, (err, user: any) => {
      if (err) { return done(err); }
      if (!user) {
        return done(undefined, false, { message: `Email ${email} not found.` });
      }
      user.comparePassword(password, (err: Error, isMatch: boolean) => {
        if (err) { return done(err); }
        if (isMatch) {
          return done(undefined, user);
        }
        return done(undefined, false, { message: "Invalid email or password." });
      });
    });
  }));
}
