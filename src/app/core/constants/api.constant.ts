export const API_URL =
  process.env['NODE_ENV'] === 'production'
    ? 'https://wallert.iran.liara.run'
    : 'http://localhost:3333';
