import { User } from "../Schema/user-schema.mjs";
import { comparePassword} from "../helpers/helpers.mjs";

const userRegister = (async (req, res) => {
    const { body } = req;
    const newUser = await new User(body);
    try {
        const savedUser = await newUser.save();
        return res.status(201).send(savedUser);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
})

const userLogin = (async (req, res) => {
    if (req.session.user) return res.status(400).send({ Message: "User alreayd logged in!" });
    const { username, password } = req.body;
    try {
        const findUser = await User.findOne({ username: username });
        var passwordMatched = comparePassword(password, findUser.password)
        if (!passwordMatched)
            return res.status(400).send({ Message: "Bad Credentials!" });
        req.session.user = findUser;
        res.status(200).send({ Message: "User Logged in successfully!!" });
    } catch (error) {
        console.log(error)
        res.Status(500).send(error)
    }

})

export {
    userRegister,
    userLogin,
}