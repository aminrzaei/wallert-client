export const API_URL =
  process.env['NODE_ENV'] === 'production'
    ? 'https://production-api.example.com'
    : 'http://localhost:3333';
