import passport from "passport";
import { Strategy as  BearerStrategy} from "passport-http-bearer";
import { validateToken } from "./token.js";

passport.use(new BearerStrategy(
    async function(token, done) {
    
    const usuario =  await validateToken(token)
    if (!usuario) return done(null, false);
    return done(null, usuario);
    }
));
export default passport;