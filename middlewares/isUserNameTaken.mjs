import { User } from "../Schema/user-schema.mjs";


export const isUsenameTaken = async (req, res, next) => {
    try {
        const {body} = req;
        const taken = await User.findOne({ username: body.username });
        if (taken) return res.status(400).send({ Message: "UserName is taken!" })
        next();
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}