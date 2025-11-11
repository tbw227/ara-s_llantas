exports.up = function (knex) {
  return knex.schema.createTable('contact_messages', function (table) {
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('phone').nullable();
    table.text('message').notNullable();
    table.enum('status', ['new', 'read', 'replied']).defaultTo('new');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('contact_messages');
};
