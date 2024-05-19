
import userService from '../services/user.service.js';
//sempre que tiver alguma integração com código externo da aplicação, como no caso o código do DB
//precisamos usar async await para aguardar o recebimento dos dados
const create = async (req, res) => {
    try {
        const { name, username, email, password, avatar, background } = req.body; //o body da aplicação envia isso para o controlador, e daqui envia para o db

        //aqui faz a tratativa do que será enviado para o DB, para evitar uso desnecessário de recurso do db
        if (!name || !username || !email || !password || !avatar || !background) {
            return res.status(400).send({ message: "Submit all fields for registration" })
        }

        const user = await userService.create(req.body); //aqui tá recebendo o documento do db

        if (!user) {
            return res.status(400).send({ message: "Error creating User" })
        }

        //201 created envia o objeto user com todas as suas propriedades e valores.
        res.status(201).send({
            user: {
                id: user._id,
                name,
                username,
                email,
                //password,
                avatar,
                background
            },
            message: "User created successfull"
        })
    } catch (err) {
        res.status(500).send({ message: err.message }); //se o servidor estiver com algum erro será apresentado por aqui
    }
};

const findAll = async (req, res) => {
    try {
        const users = await userService.findAllService(); //função que vem do service
        if (users.length === 0) {
            return res.status(400).send({ message: "There are no registered users" })
        }

        res.send(users);
    } catch (err) {
        res.status(500).send({ message: err.message }); //se o servidor estiver com algum erro será apresentado por aqui
    }
}

const findById = async (req, res) => {
    try {
        const user = req.user; //pega o user da função anterior que vem do middleware, onde está sendo verificado se o user existe
        res.send(user);
    } catch {
        res.status(500).send({ message: err.message }); //se o servidor estiver com algum erro será apresentado por aqui
    }
}

const update = async (req, res) => {
    try {//reparar que nesse método, estão sendo utilizados req.body e req.params
        const { name, username, email, password, avatar, background } = req.body; //o body da aplicação envia isso para o controlador, e daqui envia para o db

        //aqui faz a tratativa do que será enviado para o DB, para evitar uso desnecessário de recurso do db
        if (!name && !username && !email && !password && !avatar && !background) {
            //apenas um campo precisa ser enviado para update
            return res.status(400).send({ message: "Submit at least one field for update" })
        }

        const { id, user } = req;
        //a verificação se o id e o user existem está sendo feito no middleware
        // atualiza, enviando esses dados para o services/contato com o db
        //como indicado no código acima, não é necssário que sejam enviados todos os campos
        //apenas os que forem preenchidos
        await userService.updateService(
            id,
            name,
            username,
            email,
            password,
            avatar,
            background
        );
        res.send({ message: "User sucessfully updated!" });
    } catch (err) {
        res.status(500).send({ message: err.message }); //se o servidor estiver com algum erro será apresentado por aqui
    }
}

/*
const deleteUser = async (req, res) => {
    const id = req.params.id
    //verifica se o user existe, através do id.
    //se o objectId não existir
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: "Invalid ID" })
    }

    const user = await userService.findByIdService(id); //função que vem do service
    if (!user) {
        return res.status(400).send({ message: "User not found" })
    }

    // atualiza, enviando esses dados para o services/contato com o db
    //como indicado no código acima, não é necssário que sejam enviados todos os campos
    //apenas os que forem preenchidos
    await userService.deleteService(
        id
    );
    res.send({ message: "User sucessfully deleted!" });
}
*/

export default {
    create,
    findAll,
    findById,
    update
    //deleteUser,
};