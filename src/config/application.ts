export default {
  nodeEnv: process.env.NODE_ENV?.toLowerCase() || 'development',
  jwtSecret: process.env.JWT_SECRET,
  apiKey: process.env.API_KEY,
  service: {}
};
