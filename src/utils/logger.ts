import { createLogger, transports, format, config } from 'winston';

const logger = createLogger({
  level: 'info',
  levels: config.npm.levels,
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.prettyPrint()
  ),
  transports: [
    new transports.File({ filename: 'logs/errors.log', level: 'error', silent: process.env.NODE_ENV === 'test' }),
    new transports.File({ filename: 'logs/combined.log', silent: process.env.NODE_ENV === 'test' })
  ]
});

if (process.env.SHOW_APPLICATION_LOGS === 'true') {
  logger.add(
    new transports.Console({
      format: format.simple()
    })
  );
}

export { logger };
