//Up é o processo de criar a tabela
exports.up = knex => knex.schema.createTable("tags", table => {
    table.increments("id");
    table.text("name").notNullable;
    table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE"); //onDelete("CASCADE") significa que se eu deletar a nota em que essa tag está vinculada, automaticamente essa tag será deletada também
    table.integer("user_id").references("id").inTable("users");
});

//Down é o processo de deletar a tabela
exports.down = knex => knex.schema.dropTable("tags");