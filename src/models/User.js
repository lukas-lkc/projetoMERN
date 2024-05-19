import mongoose from 'mongoose';
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
    //na rota, já foi indicado que isso seria obrigatório, mas aqui estamos dizendo ao banco que deve ser obrigatório e já informamos os tipos de dados
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false, //pra não retornar a senha no banco de dados quando alguém buscar por
    },
    avatar: {
        type: String,
        required: true,
    },
    background: {
        type: String,
        required: true,
    },
    
},{versionKey: false});

//criptografia do password
//um site seguro não te envia senha por email. te nvia um link para que você troque a senha, pois o sistema não deve saber qual a senha da pessoa. 
//quando digita senha errada no login, não deve dizer senha incorreta, mas sim, user ou senha incorreta, pois não devemos saber se a senha está certa ou não
UserSchema.pre("save", async function (next) { //função que leva um tempo para acontecer, por isso é assync com await
    try{
        this.password = await bcrypt.hash(this.password, 10); //aqui o password troca de valor para um conjunto de números aleatórios. Menos de 10 rodadas é ruim, mais de 10 pode ser lento
    next();
    }catch(err){
        res.status(500).send({ message: err.message }); //se o servidor estiver com algum erro será apresentado por aqui
    }
}); //pre() significa que antes de salvar esse documento faça algo. não pode ser arrow function
 
const User = mongoose.model("User", UserSchema);
export default User;