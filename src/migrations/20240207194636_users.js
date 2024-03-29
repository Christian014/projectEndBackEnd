/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
   return knex.schema.createTable("users", (table) => {
        table.increments("id");
        table.string("name");
        table.string("email");
        table.string("password");
        table.string("autenticacao").defaultTo("user")
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
   return knex.schema.dropTable("users")
};
