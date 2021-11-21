var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const userMustExist = require("../guards/userMustExist");
const userMustBeLoggedIn = require("../guards/userMustBeLoggedIn")


router.get("/", async function (req, res) {
  try {
    const results = await db("SELECT * FROM users;");
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/user", userMustBeLoggedIn, async function (req, res) {

  try {
    const results = await db(`SELECT * FROM users WHERE id="${req.user.userId}"`);
    res.send(results.data);

  } catch (err) {
    res.status(500).send(err);
  }
});


router.post("/", async function (req, res) {
  const { nickname, email, firstname, lastname, password } = req.body
  try {
    await db(
      `INSERT INTO users (nickname, email, firstname, lastname, password) VALUES ("${nickname}", "${email}", "${firstname}", "${lastname}","${password}" );`
    );

    const results = await db(
      "SELECT * FROM users ORDER BY id DESC LIMIT 1;"
    );
    res.status(201).send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put("/", userMustBeLoggedIn, async (req, res) => {
  const { nickname, email, firstname, lastname } = req.body
  try {
    await db(`UPDATE users SET nickname = "${nickname}", email = "${email}", firstname = "${firstname}", lastname = "${lastname}"  WHERE id = "${req.user.userId}";`);

    const results = await db(`SELECT * FROM users  WHERE id = ${req.user.userId};`);
    res.status(201).send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// DELETE a user.
router.delete("/:id", userMustExist, async function (req, res) {
  const { id } = req.params
  try {
    await db(`DELETE FROM prompts WHERE user_id= ${id}; DELETE FROM categories WHERE user_id= ${id}; DELETE FROM users WHERE id= ${id}; `);
    const results = await db("SELECT * FROM users;");

    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
