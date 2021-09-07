export default {
  nodeEnv: process.env.NODE_ENV?.toLowerCase() || 'development',
  jwtSecret: process.env.JWT_SECRET,
  apiKey: process.env.API_KEY,
  host: process.env.HOST,
  service: {
    elasticSearchUrl: process.env.ELASTIC_URL || 'http://localhost:9200'
  }
};
