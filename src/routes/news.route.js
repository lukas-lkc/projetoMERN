import { Router } from "express";
import { create, findAll, findById, findByTitle, topNews } from "../controllers/news.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

//rota e a função
router.post("/", authMiddleware, create);
router.get("/", findAll);
router.get("/top", topNews);
router.get("/search", findByTitle);
router.get("/:id", authMiddleware, findById); //quando a rota tem parâmetro : precisa ficar por último, se não dá erro

export default router;
