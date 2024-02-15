
exports.up = function(knex) {
    return knex.schema.createTable("dish", (table) => {
        table.increments("id");
        table.string("image");
    })
};


exports.down = function(knex) {
    return knex.schema.dropTable("dish")
};
