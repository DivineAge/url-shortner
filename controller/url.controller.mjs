import { url } from "../Schema/url-schema.mjs";
import { validationResult } from "express-validator";

async function generateRandomString() {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 7; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    try {
        const taken = await url.findOne({ shortUrl: `localhost:80/${result}` })
        if (taken) generateRandomString();
        return result
    } catch (error) {
        console.log(error)
    }
    return result;
}

const setUrl = async (req, res) => {
    const result = validationResult(req);

    // if (!req.session.user)
    //     return res.status(401).send({ Message: "User not logged in!" })

    if (!result.isEmpty()) return res.status(400).send({ erros : result.array() })

    const { body } = req;
    const random = await generateRandomString();
    const shortUrl = `localhost:80/${random}`;
    const info = {
        shortUrl: shortUrl,
        longUrl: body.longUrl,
    }
    const urls = new url(info)
    try {
        await urls.save();
        return res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
}


export default setUrl;