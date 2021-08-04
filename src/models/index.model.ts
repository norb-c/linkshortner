import { Sequelize } from 'sequelize-typescript';
import { logger } from '../utils/logger';
import URL from './url.model';

export const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_PATH,
  dialect: 'mysql',
  timezone: '+01:00',
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci'
  },
  pool: {
    min: 0,
    max: 30,
    idle: 10000,
    acquire: 30000
  },
  logging: (str: string): any => {
    return process.env.SHOW_SQL_LOGS ? logger.info(`[SEQUELIZE DATABASE] ${str}`) : null;
  }
});

sequelize.addModels([URL]);

sequelize.authenticate().catch((err: Error) => {
  console.error('Unable to connect to the database:', err);
});
