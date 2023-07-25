const knex = require("../database/knex");

class NotesController{
    async create(request, response){
        const {title , description, tags, links} = request.body;
        const { user_id } = request.params;

        const [note_id] = await knex("notes").insert({
            title,
            description,
            user_id
        });

        const linksInsert = links.map(link => {
            return {
                note_id,
                url: link
            }
        })

        await knex("links").insert(linksInsert);

        const tagsInsert = tags.map(name => {
            return {
                note_id,
                name,
                user_id
            }
        });

        await knex("tags").insert(tagsInsert);

        response.json();
    }

    async show( request, response){
        const { id } = request.params;

        const note = await knex("notes").where({id}).first();//Aqui ele vai trazer o primeiro registro de nota que ele encontrar
        const tags = await knex("tags").where({note_id: id}).orderBy("name"); //Aqui ele vai trazer todas as tags atreladas aquela nota ordenada por ordem alfabética
        const links = await knex("links").where({note_id: id}).orderBy("created_at"); //Aqui ele vai trazer todos os links atrelados aquela nota ordenados pela data de criação


        return response.json({
            ...note, //Aqui eu to puxando todo o objeto atrelado na constante note
            tags,
            links
        });
    }

    async delete(request, response){
        const {id} = request.params;

        await knex("notes").where({id}).delete(); //Aqui eu estou usando a própria função de delete na nota selecionada

        return response.json();

    }

    async index(request, response){
        const {title, user_id, tags} = request.query;

        let notes;

        if(tags){
            const filterTags = tags.split(",").map(tag => tag.trim()); //Aqui eu converto o meu texto de tags em um array
            notes = await knex("tags").select([
                "notes.id",
                "notes.title",
                "notes.user_id"
            ]).where("notes.user_id", user_id).whereLike("notes.title", `%${title}%`).whereIn("name" , filterTags).innerJoin("notes", "notes.id","tags.note_id").orderBy("notes.title")//Aqui eu to realizando a pesquisa apenas de notas que possuem a tag específica caso eu mande ela no query da requisição


        }else{
            notes = await knex("notes").where({ user_id }).whereLike("title", `%${title}%`).orderBy("title") //Aqui eu to puxando todas as notas criadas pelo usuário do id passado pela query da URL e organizando por ordem, alfabética
        }

        const userTags = await knex("tags").where({user_id});
        const notesWithTags = notes.map(note => {
            const noteTags = userTags.filter(tag => tag.note_id === note.id);

            return {
                ...note,
                tags: noteTags
            }
        })
 

        return response.json(notesWithTags);
    }

}

module.exports = NotesController;