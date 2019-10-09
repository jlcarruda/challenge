const passport = require('passport');
const { Strategy } = require('passport-http-bearer');
const { ExtractJwt } = require('passport-jwt');

const UserModel = require('../../database/models/user');

module.exports.strategy = new Strategy({
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  passReqToCallback: true
}, (req, token, done) => {
  if(token === undefined) return done(null, false);

  UserModel.findOne({ token: token }).then(user => {
    if (!user) return done(null, false);
    done(null, user);
  });
});

module.exports.authenticate = passport.authenticate('bearer', { session: false });
