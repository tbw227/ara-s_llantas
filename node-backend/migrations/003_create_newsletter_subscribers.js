/**
 * Migration: Create newsletter_subscribers table
 *
 * Stores newsletter subscription data:
 * - email: Subscriber email (unique, required)
 * - subscribed_at: Timestamp of subscription
 * - status: Subscription status (active, unsubscribed)
 * - source: Where the subscription came from (website, etc.)
 */

exports.up = function (knex) {
  return knex.schema.createTable('newsletter_subscribers', function (table) {
    table.increments('id').primary();
    table.string('email').notNullable().unique();
    table.enum('status', ['active', 'unsubscribed']).defaultTo('active');
    table.string('source').defaultTo('website'); // Track where subscription came from
    table.timestamps(true, true);

    // Index for faster lookups
    table.index('email');
    table.index('status');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('newsletter_subscribers');
};
