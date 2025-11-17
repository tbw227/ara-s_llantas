require('dotenv').config();

// Support both connection string and individual parameters
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DATABASE_URL } = process.env;

// Helper to build connection object
const getConnection = () => {
  // If DATABASE_URL is provided (common for Vercel Postgres, Railway, etc.), use it
  if (DATABASE_URL) {
    return DATABASE_URL;
  }

  // Otherwise, use individual connection parameters
  return {
    host: DB_HOST || '127.0.0.1',
    user: DB_USER || 'postgres',
    password: DB_PASSWORD || 'postgres',
    database: DB_NAME || 'aras_llantas',
    port: process.env.DB_PORT || 5432,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  };
};

module.exports = {
  development: {
    client: 'pg',
    connection: getConnection(),
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:',
    },
    useNullAsDefault: true,
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
  production: {
    client: 'pg',
    connection: getConnection(),
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};
