require("dotenv").config();
const mysql = require("mysql");
const fs = require("fs");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "promptme",
  multipleStatements: true,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  let sql = fs.readFileSync(__dirname + "/create.sql").toString();

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(
      "Tables creations `categories`, `prompts`, and `users` were successful. 1 row was added to `users`. 2 rows were added to `categories`"
    );

    console.log("Closing...");
  });

  con.end();
});
