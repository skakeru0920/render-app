exports.up = async (knex) => {
  await knex.schema.createTable("pixel", (table) => {
    table.increments("id");
    table.string("loc").notNullable().unique();
    table.integer("last_edit_time").notNullable().index();
    table.boolean("is_filled");
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable("pixel");
};
