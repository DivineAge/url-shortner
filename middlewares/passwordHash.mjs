import { hashPassword } from "../helpers/helpers.mjs";

export const passwordHash =  (req,res,next)=>{
    const {body} = req;
    try {
        const hashedPassword =  hashPassword(body.password);
        body.password = hashedPassword;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({Message : "Password didn't hash"})
    }
}