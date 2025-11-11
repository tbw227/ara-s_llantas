exports.up = function (knex) {
  return knex.schema.createTable('tires', function (table) {
    table.string('id').primary();
    table.string('brand').notNullable();
    table.string('size').notNullable();
    table.decimal('price', 10, 2).notNullable();
    table.string('image').notNullable();
    table.text('description').notNullable();
    table.enum('category', ['lawn', 'motorcycle']).notNullable();
    table.integer('stock').notNullable().defaultTo(0);
    table.string('position').nullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('tires');
};
