import { Router } from "express"; //importa Router do framework express
import userController from '../controllers/user.controller.js'
import { validId, validUser } from "../middlewares/global.middlewares.js";

const router = Router();
//os dois abaixo mesmo sendo a mesma rota, utilizam métodos diferentes. um envia o outro recebe.
router.post("/", /* aqui passa o midware*/ userController.create); //recebe a rota /, passa pelo middleware e após a função aciona o next, que faz ir para a próxima função que está no controller
//essas rotas abaixo precisam passar por autenticação de adm
router.get("/", userController.findAll);
router.get("/:id", validId, validUser, userController.findById);
router.patch("/:id", validId, validUser, userController.update);

//route.delete("/:id", userController.deleteUser);

export default router; //como só tem uma rota, todas que iniciam com route serão exportadas