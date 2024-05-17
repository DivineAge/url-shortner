import { url } from "../Schema/url-schema.mjs";
import { validationResult } from "express-validator";
import generateRandomString from "../helpers/randomStringGenerator.mjs";


export const setUrl = async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(400).send({ erros: result.array() })

    const { body } = req;
    const random = await generateRandomString();
    const shortUrl = `${req.protocol}://${req.hostname}${req.baseUrl}/${random}`;

    const info = {
        shortUrl: shortUrl,
        longUrl: body.longUrl,
        random: random
    }

    const urls = new url(info)
    try {
        await urls.save();
        res.status(201).json({message : "Url created successfuly!", data :{ shortUrl ,longUrl : body.longUrl}})
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
}

export const getUrls = async (req, res) => {
    try {
        const data = await url.find();
        const result = data.map(({ longUrl, shortUrl }) => ({ longUrl, shortUrl }));
        res.status(200).json(result);
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }

}

