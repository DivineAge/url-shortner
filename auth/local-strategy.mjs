import passport from "passport";
import { User } from "../Schema/user-schema.mjs";
import { Strategy } from "passport-local";
import { comparePassword } from "../helpers/helpers.mjs";

passport.serializeUser((user, done) => {
   
    done(null, user.id)
})
passport.deserializeUser(async (id, done) => {
    try {
        const findUser = await User.findById(id);
        if (!findUser) throw new Error("Didn't find the user by the id!")
        done(null, findUser)
    } catch (err) {
        done(err, null)
    }
})

export default passport.use(
    new Strategy(async (username, password, done) => {
        try {
            const findUser = await User.findOne({ username: username });
            if (!findUser) throw new Error("User not Found !!")
            const matchehedPassword = comparePassword(password, findUser.password);
            if (!matchehedPassword) throw new Error("Invalid password!!")
            done(null, findUser)
        } catch (err) {
            done(err, null)
        }
    })
)