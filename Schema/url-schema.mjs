import mongoose from "mongoose";

const urlSchema = mongoose.Schema({
    longUrl:{
        type: String,
        required: true,
    },
    shortUrl:{
        type: String,
        required: true,
        unique : true,
    },
    random:{
        type: String,
        required: true,
        unique : true,
    },

})

export const url = mongoose.model("url",urlSchema)