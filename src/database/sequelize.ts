import { Sequelize, Options } from 'sequelize';
import logger from '../common/logger';

const databaseConfig: Options = require('../config/mysql')[process.env.NODE_ENV || 'development'];
// throws error when added to mysql config file
databaseConfig.logging = str => {
  return process.env.SHOW_DB_NAME_QUERIES === 'true' ? logger.info(`[DATABASE QUERY] => ${str}`) : null;
};

const { database, username, password, ...sequelizeDatabaseConfig } = databaseConfig;
const sequelize = new Sequelize(database, username, password, sequelizeDatabaseConfig);

export { sequelize };
