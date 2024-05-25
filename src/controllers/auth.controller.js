import bcrypt from 'bcryptjs';
import { loginService, generateToken } from '../services/auth.service.js';

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        //if(!email && !password){}
        const user = await loginService(email); //o service vai trazer um user a partir do email
        //por questão de segurança não é indicado informar se é a senha ou o email que estão errados
        if (!user) {
            return res.status(404).send({ message: "Incorrect email or password" })
        }
        const passwordIsValid = bcrypt.compareSync(password, user.password); //isso verifica se a senha é igual a que foi salva e trás true or false

        if (!passwordIsValid) {
            return res.status(404).send({ message: "Incorrect password or email" })
        }

        const token = generateToken(user.id)

        res.send({token});
    } catch (err) {
        res.status(500).send(err.message)
    }

}

export { 
    login
};