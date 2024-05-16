
const create = (req, res) => {
    const {name, username, email, password, avatar, background} = req.body; //o body da aplicação envia isso para o controlador, e daqui envia para o db

    //aqui faz a tratativa do que será enviado para o DB, para evitar uso desnecessário de recurso do db
    if(!name || !username || !email || !password || !avatar || !background) {
        res.status(400).send({message: "Submit all fields for registration"})
    }
    res.status(201).send({
        user: {
            name,
            username,
            email,
            //password,
            avatar,
            background
        },
        message: "User created successfull"
    })
};
module.exports = {create};