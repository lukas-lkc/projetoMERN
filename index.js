import express from "express";
import connectDatabase from "./src/database/db.js";
import dotenv from "dotenv"

import userRoute from "./src/routes/user.route.js";
import authRoute from "./src/routes/auth.route.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000; //process.env.PORT É o servidor que define a porta de forma automática. Ou 3000 pq por enquanto pra mim vai rodar na 3000

connectDatabase();
app.use(express.json()); //deixa a aplicação apta a receber e enviar arquivos json

app.use("/user", userRoute);
app.use("/auth", authRoute);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));