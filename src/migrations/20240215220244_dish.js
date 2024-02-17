
exports.up = function(knex) {
    return knex.schema.createTable("dish", (table) => {
        table.increments("id");
        table.string("image");
        table.string("name");
        table.string("price");
        table.string("category");
        table.string("ingredients");
        table.string("description");
    })
};


exports.down = function(knex) {
    return knex.schema.dropTable("dish");
};
