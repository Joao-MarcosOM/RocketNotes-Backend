// A missão do index.js é de reunir todas as rotas da aplicação que estarão separadas por arquivos
const { Router } = require("express");

const usersRouter = require("./user.routes")

const notesRoutes = require("./notes.routes")

const tagsRoutes = require("./tags.routes")

const routes = Router();

routes.use("/users", usersRouter);
//Toda vez que alguém acessar a url /users, vai ser redirecionado para o usersRouter

routes.use('/notes', notesRoutes);
//Toda vez que alguém acessar a url /notes, vai ser redirecionado para o notesRouter

routes.use('/tags', tagsRoutes);
//Toda vez que alguém acessar a url /tags, vai ser redirecionado para o tagsRoutes

module.exports = routes;