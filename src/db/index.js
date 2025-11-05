const knex = require('knex');
const knexConfig = require('./knexfile');
console.log(process.env.DATABASE_URL, 'url');
const environment = process.env.DATABASE_URL ? 'production' : 'development';
console.log(environment, 'this is settings');

module.exports = knex(knexConfig);
// module.exports = knex(knexConfig[environment]);
