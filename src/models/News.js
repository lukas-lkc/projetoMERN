import { text } from "express";
import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    text: {
        type: String,
        require: true,
    },
    banner: {
        type: String,
        require: true,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    },
    //pega como referenci o ID do usuário, da colection User. chave estrangeira
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", //nome da coleção que está sendo exportada na classe User. 
        require: true,
    },
    likes: {
        type: Array,
        reqire: true,
    },
    comments: {
        type: Array,
        reqire: true,
    },
});

const News = mongoose.model("News", NewsSchema);

export default News;