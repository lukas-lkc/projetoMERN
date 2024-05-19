//middleware tem funções entre a rota e as funções de callback (controller)
//recebe a requisição do cliente através da rota 
import mongoose from "mongoose";
import userService from '../services/user.service.js';

export const validId = (req, res, next) => {
    try {//verifica se o ID existe. se existir manda para a próxima função do controller
        const id = req.params.id
        //verifica se o ID existe.
        //se o objectId não existir
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: "Invalid ID" })
        }

        next();
    } catch (err) {
        res.status(500).send({ message: err.message }); //se o servidor estiver com algum erro será apresentado por aqui
    }
};

export const validUser = async (req, res, next) => {
    try {
        const id = req.params.id
        const user = await userService.findByIdService(id);

        if (!user) {
            return res.status(400).send({ message: "User not found" })
        }

        req.id = id;
        req.user = user;

        next();
    } catch (err) {
        res.status(500).send({ message: err.message }); //se o servidor estiver com algum erro será apresentado por aqui
    }
};
 