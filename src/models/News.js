import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    banner: {
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now(), //pega o horário local do servidor 
    },
    //pega como referenci o ID do usuário, da colection User. chave estrangeira
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", //nome da coleção que está sendo exportada na classe User. 
        required: true,
    },
    //os dois a baixo podem ser novas tabelas
    likes: {
        type: Array,
        required: true,
    },
    comments: {
        type: Array,
        required: true,
    },
},{versionKey: false});

const News = mongoose.model("News", NewsSchema);

export default News;