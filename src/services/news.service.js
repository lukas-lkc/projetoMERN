import News from "../models/News.js";

const createService = (body) => News.create(body);
//find busca por todas as postagens. sort _id -1, faz com que a última postagem seja apresentada em primeiro lugar
//último a chegar, primeiro a sair
//skip recebe o valor de offset indica que começa no 0, traz o número de limit a partir do elemento do indice 0. após a primeira pesquisa, precisa trocar o indice de 0 para 5, por exemplo, daí pega o 6° elemento em diante 
//limit é o número de dados que serão trazidos do banco de dados por vez.
//sem o populate, o user era referenciado apenas com o ID. com o populate, todos os dados do user são trazidos
const findAllService = (offset, limit) => News.find().sort({_id: -1}).skip(offset).limit(limit).populate("user");

const countNews = () => News.countDocuments();

const findByIdService = (id) => News.findById(id)//.populate("user");

//findOne() com sort(_id: -1) trás o último item da coleção.
const topNewsService = () => News.findOne().sort({_id: -1}).populate("user");

export {
    createService, 
    findAllService,
    findByIdService,
    countNews,
    topNewsService
}