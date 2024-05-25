import dotenv from 'dotenv';
import userService from '../services/user.service.js';
import jwt from "jsonwebtoken";

dotenv.config();

export const authMiddleware = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        //se não tiver token, significa que não fez login e não tem autorização
        if (!authorization) {
            return res.status(401).send({ message: "Unauthorized customer" });
        }

        const parts = authorization.split(" ");

        if (parts.length !== 2) {
            return res.send(401);
        }
        //desestruturação do array
        const [schema, token] = parts;

        if (schema !== "Bearer") {
            return res.status(401).send({ message: "Bearer is required" });
        }

        jwt.verify(token, process.env.SECRET, async (error, decoded) => {
            if (error) {
                return res.status(401).send({ message: "Token invalid!" });
            }
            //esse decoded é referente a decodificação do token. No contexto do projeto (auth.service), está sendo trazido o ID, e a validade do token
            //dessa forma: {id: x, iat: y, exp: z. iat é o início da expiração e exp o final, estão em milesegundos}

            //verifica se o ID existe, pois, o token pode ser válido, mas o user pode não existir mais
            const user = await userService.findByIdService(decoded.id)
            
            if (!user || !user.id) {
                return res.status(401).send({ message: "Invalid token" })
            }
            req.userId = user.id;

            return next();
        });
        
    } catch (err) {
        res.status(500).send(err.message);
    }

}