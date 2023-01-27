const { Pool } = require("pg");
const { db } = require("./config");

const pool = new Pool({
  user: "postgres",
  database: "dm_worktools",
  password: "postgres",
  host: "localhost",
  port: 5432,
});

module.exports = pool;
