import { url } from "../Schema/url-schema.mjs";

async function generateRandomString() {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 7; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    try {
        const taken = await url.findOne({ random: result })
        if (taken) generateRandomString();
        return result
    } catch (error) {
        console.log(error)
    }
    return result;
}

export default generateRandomString;