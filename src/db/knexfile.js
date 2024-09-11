module.exports = {
  client: "pg",
  connection: {
    user: process.env.POSTGRES_USER || "postgres",
    database: process.env.POSTGRES_DB || "ccpixels",
  },
  migrations: {
    directory: "./data/migrations",
  },
  seeds: { directory: "./data/seeds" },
};
