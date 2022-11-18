import httpLogger from 'pino-http';
import logger from '../common/logger';
import { applicationConfiguration } from '../config';

const requestLogger = httpLogger({
  logger,
  genReqId: function (req) {
    return req.id;
  },
  serializers: {
    req: req => ({
      environment: applicationConfiguration.nodeEnv,
      requestId: applicationConfiguration.nodeEnv,
      appEnv: applicationConfiguration.nodeEnv,
      serviceName: applicationConfiguration.nodeEnv,
      method: req.method,
      url: req.url,
      query: req.query,
      requestBody: req.raw.body,
      ipAddress: req.remoteAddress,
      params: req.params
    }),
    res: res => ({
      statusCode: res.statusCode
    })
  },
  customLogLevel: (res, err) => {
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return 'warn';
    } else if (res.statusCode >= 500 || err) {
      return 'error';
    }
    return 'info';
  },
  customSuccessMessage: res => {
    if (res.statusCode === 404) {
      return 'resource not found';
    }
    return 'request completed';
  },
  customErrorMessage: (error, res) => {
    return 'request errored with status code: ' + res.statusCode;
  },
  customAttributeKeys: {
    req: 'request',
    res: 'response',
    err: 'error',
    responseTime: 'timeTaken'
  }
});

export default requestLogger;
