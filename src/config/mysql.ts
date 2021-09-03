// /* eslint-disable */
require('dotenv/config');

const databaseConfig = {
  host: process.env.MYSQL_PATH || '127.0.0.1',
  username: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: process.env.MYSQL_DATABASE || '',
  port: Number(process.env.MYSQL_DATABASE_PORT || '3306'),
  dialect: 'mysql',
  define: {
    underscored: true,
    timestamps: true,
    freezeTableName: true
  },
  logQueryParameters: true,
  // @ts-ignore
  logging: str => {
    return process.env.SHOW_MYSQL_DATABASE_QUERIES === 'true' ? console.log(`[DATABASE QUERY ${new Date()}] => ${str}`) : null;
  }
};

module.exports = {
  development: {
    ...databaseConfig
  },
  test: {
    ...databaseConfig
  },
  staging: {
    ...databaseConfig
  },
  production: {
    host: process.env.DATABASE_URL,
    define: {
      underscored: true,
      timestamps: true,
      freezeTableName: true
    },
    logQueryParameters: true,
    // @ts-ignore
    logging: str => {
      return process.env.SHOW_MYSQL_DATABASE_QUERIES === 'true' ? console.log(`[DATABASE QUERY ${new Date()}] => ${str}`) : null;
    },
    dialect: 'postgres'
  }
};
