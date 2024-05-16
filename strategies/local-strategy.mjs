import passport from "passport";
import { User } from "../Schema/user-schema.mjs";
import { Strategy } from "passport-local";
import { comparePassword } from "../helpers/helpers.mjs";

// passport.serializeUser((user , done)=>{
//     done(null , user._id)
// })

export default passport.use(
    new Strategy( (username, password, done) => {
        try {
            console.log(`Username is ~~~~~~ : ${username}`)
            console.log(`password is ~~~~~~ : ${password}`)
            const findUser = User.findOne({ username: username });
            if (!findUser) throw new Error("User not Found !!")
            const matchehedPassword =  comparePassword(password, findUser.password);
            if(!matchehedPassword) throw new Error("Invalid password !!")
            
            done(null , findUser)
        } catch (err) {
            done(err,null)
        }
    })
)