const { Router } = require("express");

const NotesController = require("../controllers/NotesController");
//Aqui eu importo o controller

const notesRoutes = Router();


const notesController = new NotesController();

notesRoutes.get("/" , notesController.index);

notesRoutes.post("/:user_id" , notesController.create);
//Aqui eu to fazendo com que caso a rota X seja acessada, o método Y da minha classe será executado
//Usando dessa forma, eu falo que essa rota específica tem o middleware

notesRoutes.get("/:id" , notesController.show);

notesRoutes.delete("/:id" , notesController.delete);




module.exports = notesRoutes;
//Aqui eu estou exportando o arquivo para quem quiser utilizar