import pino, { LoggerOptions } from 'pino';
import pinoElastic from 'pino-elasticsearch';
import { applicationConfiguration } from '../config';

const streamToElastic = pinoElastic({
  index: 'linkshortner',
  consistency: 'one',
  node: applicationConfiguration.service.elasticSearchUrl,
  'es-version': 7,
  'flush-bytes': 1000
});

// Capture errors like unable to connect Elasticsearch instance.
streamToElastic.on('error', error => {
  console.error('Elasticsearch client error:', error);
});
// Capture errors returned from Elasticsearch, "it will be called for every time a document can't be indexed".
streamToElastic.on('insertError', error => {
  console.error('Elasticsearch server error:', error);
});

const customStreams = applicationConfiguration.nodeEnv === 'development' ? process.stdout : streamToElastic;

const options: LoggerOptions = {
  redact: ['request.body.sensitive'],
  timestamp: pino.stdTimeFunctions.isoTime
};

const logger = pino(options, customStreams);

export default logger;
