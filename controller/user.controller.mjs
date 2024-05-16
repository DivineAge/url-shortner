import { validationResult } from "express-validator";
import { User } from "../Schema/user-schema.mjs";
import { comparePassword } from "../helpers/helpers.mjs";

const userRegister = (async (req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()) res.status(400).send({Message : "Please enter a valid email!"})
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
    res.status(200).send({ Message: "User Logged in successfully!!" });
})

export {
    userRegister,
    userLogin,
}