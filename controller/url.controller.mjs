import { url } from "../Schema/url-schema.mjs";
import { validationResult } from "express-validator";
import generateRandomString from "../helpers/randomStringGenerator.mjs";


const setUrl = async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(400).send({ erros : result.array() })

    const { body } = req;
    const random = await generateRandomString();
    const shortUrl = `${req.protocol}://${req.hostname}${req.baseUrl}/${random}`;

    const info = {
        shortUrl: shortUrl,
        longUrl: body.longUrl,
        random : random
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