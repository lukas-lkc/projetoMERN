//o service que busca e trás dados do DB
//o controller manda as info para o services e o services se comunica com o Db
import User from "../models/User.js";

const create = (body) => User.create(body)

const findAllService = () => User.find();

const findByIdService = (id) => User.findById(id);

//o service recebe os dados do db
const updateService = (
    id,
    name,
    username,
    email,
    password,
    avatar,
    background
) => //após receber, faz o update das propriedades 
    User.findOneAndUpdate(
        { _id: id },
        { name, username, email, password, avatar, background }
    )

/*
const deleteService = (
    id
) => //após receber, faz o update das propriedades 
    User.deleteOne(
        { _id: id }
    )
*/
export default {
    create,
    findAllService,
    findByIdService,
    updateService
    //deleteService,
}
