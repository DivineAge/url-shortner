import express from "express";
import { userLogin, userRegister } from "../controller/user.controller.mjs";
import setUrl from "../controller/url.controller.mjs";
import { body } from "express-validator";
import { isUsenameTaken } from '../middlewares/isUserNameTaken.mjs'
import { passwordHash } from "../middlewares/passwordHash.mjs";
const router = express.Router();

router.post('/register', isUsenameTaken, passwordHash, userRegister);
router.post('/login', userLogin);
router.post('/shorten-url', body('longUrl').isURL().withMessage("Invalid url"), setUrl);

export default router;  