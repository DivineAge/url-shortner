import { url } from "../Schema/url-schema.mjs";

export const sameUrl = async (req, res, next) => {
    const { longUrl } = req.body;
    try {
        const data = await url.findOne({ longUrl: longUrl });
        return data ? res.status(400).send({ message: "url already exists" }) : next();
      } catch (error) {
        return res.status(500).send({ message: "Server error" });
      }
}