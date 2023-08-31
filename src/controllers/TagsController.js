const knex = require("../database/knex");

class TagsController{

    async index( request, response){
        const  user_id  = request.user.id;

        const tags = await knex("tags").where({ user_id }).groupBy("name");//Aqui ele vai trazer todas as tags atreladas aquela usuário ordenada por ordem alfabética e não repetidos

        return response.json({
            tags
        });
    }

}

module.exports = TagsController;