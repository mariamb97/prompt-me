var express = require("express");
var router = express.Router();
const db = require( "../model/helper" );
const userMustExist = require("../guards/userMustExist");


// GET users listing. 
router.get("/", async function (req, res) {
  try {
    const results = await db("SELECT * FROM users;");
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
} );

// GET a user
router.get( "/:user_id", userMustExist, async function ( req, res ) {
  res.send(req.user);
  
  // try {
  //   const results = await db(`SELECT * FROM users WHERE user_id= ${req.params.user_id};`);
  //   res.send(results.data);
  // } catch (err) {
  //   res.status(500).send(err);
  // }
});

// INSERT a new user into the DB
router.post("/", async function (req, res) {
  try {
    await db(
      `INSERT INTO users (user_nickname, user_firstname, user_lastname, user_password) VALUES ("${req.body.user_nickname}", "${req.body.user_firstname}", "${req.body.user_lastname}","${req.body.user_password}" );`
    );

    const results = await db("SELECT * FROM users;");

    res.status(201).send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// DELETE a user from the DB
router.delete("/:user_id", userMustExist, async function (req, res) {
  try {
    await db(`DELETE FROM users WHERE user_id= ${req.params.user_id};`);
    const results = await db("SELECT * FROM users;");

    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
