import { Router } from "express";
import {login} from "../controllers/auth.controller.js"; //a importação dessa forma se chama desestruturada, pois em vez de pegar todas as funções do auth.controller estou pegando apenas uma chamada login

const router = Router();

router.post("/", login) //devido a utilização da importação desestruturada, aqui eu não preciso usar authController.login, apenas 'login'.

export default router;