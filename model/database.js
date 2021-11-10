require("dotenv").config();
const mysql = require("mysql");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "promptme",
  multipleStatements: true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  let sql =
    "DROP TABLE if exists users; CREATE TABLE users(user_id INT NOT NULL AUTO_INCREMENT, user_nickname VARCHAR( 255 ) not null, user_firstname VARCHAR( 255 ) not null, user_lastname VARCHAR( 255 ) not null, user_password VARCHAR( 255 ) not null,PRIMARY KEY( user_id ));DROP TABLE if exists prompts; CREATE TABLE prompts(prompt_id INT NOT NULL AUTO_INCREMENT, prompt_description VARCHAR( 255 ) not null, prompt_requirements VARCHAR( 255 ) not null, prompt_links VARCHAR( 255 ) not null,user_id INT NOT NULL,category_id INT NOT NULL, PRIMARY KEY( prompt_id ) );DROP TABLE if exists categories;CREATE TABLE categories(category_id INT NOT NULL AUTO_INCREMENT, category_name VARCHAR( 255 ) not null, category_description VARCHAR( 255 ) not null, user_id INT not null,PRIMARY KEY( category_id ) );ALTER TABLE `prompts` ADD CONSTRAINT `prompts_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`);ALTER TABLE `prompts` ADD CONSTRAINT `prompts_fk1` FOREIGN KEY (`category_id`) REFERENCES `categories`(`category_id`);ALTER TABLE `categories` ADD CONSTRAINT `categories_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`);";
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Table creation `prompt` was successful!");

    console.log("Closing...");
  });

  con.end();
} );