import { Sequelize, Options } from 'sequelize';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const databaseConfig: Options = require('../config/mysql')[process.env.NODE_ENV || 'development'];

const { database, username, password, ...sequelizeDatabaseConfig } = databaseConfig;
const sequelize = new Sequelize(database, username, password, sequelizeDatabaseConfig);

export { sequelize };
