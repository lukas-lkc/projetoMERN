import { createService, findAllService, countNews } from "../services/news.service.js"

const create = async (req, res) => {
    try {
        const {title, text, banner} = req.body;
        
        if(!title || !text || !banner){
            return res.status(400).send({ message: "Submit all fields for registration" });
        }

        await createService({
            title,
            text,
            banner,
            user: req.userId,
        });

        res.send(201);

    } catch (err) {
        res.status(500).send({ message: err.message }); //se o servidor estiver com algum erro será apresentado por aqui
    }
};

//função que tras todos os posts, com paginação (limitando os retornos para garantir performance do db)
const findAll = async (req, res) => {

    //para limitar a quantidade de resultados de uma chamada.
    //essas duas variáveis serão parâmetros na URL
    let {limit, offset} = req.query;
    //tudo que vem da query/URL vem como string, então aqui transforma em número. 
    limit = Number(limit);
    offset = Number(offset);
    //se o limit não for informado, por padrão será 5
    if(!limit){
        limit = 5;
    }
    if(!offset){
        offset = 0;
    }
    console.log(limit, offset)

    //a função findAllService está trazendo todos os posts. Mas se forem milhões de dados vai ficar muito pesado
    //Por isso foram criados o limit e offset que serão passados como parâmetros da função
    const news = await findAllService(offset, limit);
    const total = await countNews();
    //pega a URL padrão
    const currentUrl = req.baseUrl;
    console.log("url padrão: ", currentUrl);
    console.log("total: ",total);

    const nextPosts = offset + limit;

    const nextUrl = nextPosts < total ? `${currentUrl}?limit=${limit}&offset=${nextPosts}`: null;
    console.log("url: ",nextUrl);
    
    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}`: null;

    if (news.length === 0) {
        return res.status(400).send({ message: "There are no registered news" })
    }
    res.send( {
        nextUrl,
        previousUrl,
        limit,
        offset,
        total,
        //map retorna um array com os valores de news, ou seja, cada post 
        results : news.map(item => ({
            id: item._id,
            title: item.title,
            text: item.text,
            banner: item.banner,
            likes: item.likes,
            comments: item.comments,
            name: item.user.name,
            userName: item.user.username,
            userAvatar: item.user.avatar, 
        }))
    } );
};

export { 
    create, 
    findAll 
};