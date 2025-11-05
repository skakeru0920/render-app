// const path = require('path');
// module.exports = {
//   development: {
//     client: 'pg',
//     connection: {
//       database: 'ccpixels',
//       user: 'postgres',
//       password: null,
//     },
//     migrations: {
//       directory: './data/migrations',
//     },
//     seeds: { directory: './data/seeds' },
//   },
//   production: {
//     client: 'pg',
//     connection: process.env.DATABASE_URL,
//     ssl: {
//       rejectUnauthorized: false,
//     },
//     migrations: {
//       directory: path.resolve(__dirname, './data/migrations'),
//     },
//     seeds: { directory: path.resolve(__dirname, './data/seeds') },
//   },
// };

module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL || {
    database: 'ccpixels',
    user: 'postgres',
    password: null,
  },
  migrations: {
    directory: './data/migrations',
  },
  seeds: { directory: './data/seeds' },
};
