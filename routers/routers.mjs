import express from "express";
import { userLogin, userRegister } from "../controller/user.controller.mjs";
import { setUrl, getUrls } from '../controller/url.controller.mjs'
import { body } from "express-validator";
import { isUsenameTaken } from '../middlewares/isUserNameTaken.mjs'
import { passwordHash } from "../middlewares/passwordHash.mjs";
import '../auth/local-strategy.mjs'
import passport from "passport";
import logOut from "../controller/logout.controller.mjs";
import isLoggedIn from "../middlewares/isLoggedIn.mjs";
import { sameUrl } from "../middlewares/sameUrl.mjs";


const router = express.Router();

router.post('/register', body('email').isEmail().withMessage("Invalid email"), isUsenameTaken, passwordHash, userRegister);
router.post('/login', passport.authenticate('local'), userLogin);
router.post('/url-shortner', isLoggedIn, body('longUrl').isURL().withMessage("Invalid url"),sameUrl, setUrl);
router.get('/logout', isLoggedIn, logOut)
router.get('/urls', isLoggedIn, getUrls)

export default router;  