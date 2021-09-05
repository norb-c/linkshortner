import pino, { LoggerOptions } from 'pino';
import pinoElastic from 'pino-elasticsearch';

const streamToElastic = pinoElastic({
  index: 'linkshortner',
  consistency: 'one',
  node: process.env.ELASTIC_URL,
  'es-version': 7,
  'flush-bytes': 1000
});

// Capture errors like unable to connect Elasticsearch instance.
streamToElastic.on('error', error => {
  console.error('Elasticsearch client error:', error);
});
// Capture errors returned from Elasticsearch, "it will be called for everytime a document can't be indexed".
streamToElastic.on('insertError', error => {
  console.error('Elasticsearch server error:', error);
});

const customStreams = process.env.NODE_ENV === 'development' ? streamToElastic : process.stdout;

const options: LoggerOptions = {
  redact: ['request.body.sensitive'],
  timestamp: pino.stdTimeFunctions.isoTime
};

const logger = pino(options, customStreams);

export default logger;
