import passport from "passport";
import request from "request";
import passportFacebook from "passport-facebook";
import { User } from "../../models/User";
const facebookStrategy = passportFacebook.Strategy;

export function initFacebookStrategy() {
  const errMessage = `There is already a Facebook account that belongs to you.
Sign in with that account or delete it, then link it with your current account.`;

  passport.use(new facebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: "/auth/facebook/callback",
    profileFields: ["name", "email", "link", "locale", "timezone"],
    passReqToCallback: true,
  },                                (req: any, accessToken, refreshToken, profile, done) => {
    if (req.user) {
      User.findOne({ facebook: profile.id }, (err, existingUser) => {
        if (err) { return done(err); }
        if (existingUser) {
          req.flash("errors", { msg: errMessage });
          done(err);
        } else {
          User.findById(req.user.id, (err, user: any) => {
            if (err) { return done(err); }
            user.facebook = profile.id;
            user.tokens.push({ accessToken, kind: "facebook"  });
            const { givenName , familyName } = profile.name;
            user.profile.name = user.profile.name || `${givenName} ${familyName}`;
            user.profile.gender = user.profile.gender || profile._json.gender;
            user.profile.picture = user.profile.picture ||
            `https://graph.facebook.com/${profile.id}/picture?type=large`;
            user.save((err: Error) => {
              req.flash("info", { msg: "Facebook account has been linked." });
              done(err, user);
            });
          });
        }
      });
    } else {
      User.findOne({ facebook: profile.id }, (err, existingUser) => {
        if (err) { return done(err); }
        if (existingUser) {
          return done(undefined, existingUser);
        }
        User.findOne({ email: profile._json.email }, (err, existingEmailUser) => {
          if (err) { return done(err); }
          if (existingEmailUser) {
            req.flash("errors", { msg:
                `There is already an account using this email address.
                 Sign in to that account and link it with
                 Facebook manually from Account Settings.` });
            done(err);
          } else {
            const user: any = new User();
            user.email = profile._json.email;
            user.facebook = profile.id;
            user.tokens.push({ accessToken, kind: "facebook" });
            user.profile.name = `${profile.name.givenName} ${profile.name.familyName}`;
            user.profile.gender = profile._json.gender;
            user.profile.picture = `https://graph.facebook.com/${profile.id}/picture?type=large`;
            user.profile.location = (profile._json.location) ? profile._json.location.name : "";
            user.save((err: Error) => {
              done(err, user);
            });
          }
        });
      });
    }
  }));
}
