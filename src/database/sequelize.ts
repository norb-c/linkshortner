import { Sequelize, Options } from 'sequelize';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const databaseConfig: Options = require('../config/mysql')[process.env.NODE_ENV || 'development'];

const { database, username, password, host, ...sequelizeDatabaseConfig } = databaseConfig;
let sequelize: Sequelize;
if (process.env.NODE_ENV === 'production') {
  console.log('In production mode ....', process.env.DATABASE_URL);
  sequelize = new Sequelize(host, sequelizeDatabaseConfig);
} else {
  console.log('In development mode ....');
  sequelize = new Sequelize(database, username, password, sequelizeDatabaseConfig);
}
export { sequelize };
