import User from '../models/User.js'
import jwt from "jsonwebtoken";

const loginService = (email) => 
    User.findOne({ email: email }).select("+password");

//de forma bbásica token que vai guardar a seção do user após o login
const generateToken = (id) => 
    jwt.sign({id: id}, process.env.SECRET_JWT, {expiresIn: 86400}); //{expiresIn: 86400} é uma opção para definir o tempo de autenticação, ou seja, o tempo que o token vai ser válido. o valor representa 24h em segundos
    //Dessa forma, cria um token com 3 itens. tipo do token(jwt), id (carga que será criptografada), e a assinatura(secret).
    //quando o token for gerado e retornado para o front end, terá esses 3 itens criptografados em hash.
export { loginService, generateToken };