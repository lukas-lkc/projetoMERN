import { createService, findAllService } from "../services/news.service.js"

const create = async (req, res) => {
    try {
        const {title, text, banner} = req.body;

        if(!title || !text || !banner){
            return res.status(400).send({ message: "Submit all fields for registration" });
        }

        await createService({
            title,
            text,
            banner,
            id: "objectidfake"
        });

        res.send(201);
        
    } catch (err) {
        res.status(500).send({ message: err.message }); //se o servidor estiver com algum erro será apresentado por aqui
    }
}

const findAll = async (req, res) => {
    const news = [];
    res.send({ news })
}

export default { create, findAll }