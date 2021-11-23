var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const categoryMustExist = require("../guards/categoryMustExist");
const userMustBeLoggedIn = require("../guards/userMustBeLoggedIn")


router.get('/', async function (req, res) {
  try {
    const results = await db("SELECT * FROM categories;");
    res.send(results.data);

  } catch (err) {
    res.status(500).send(err);
  }
});


router.get('/users', userMustBeLoggedIn, async function (req, res) {
  try {
    const results = await db(`SELECT * FROM categories WHERE user_id="${req.user.userId}" ;`);
    res.send(results.data);

  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/public', userMustBeLoggedIn, async function (req, res) {
  try {
    const results = await db(`SELECT * FROM categories WHERE user_id = 1 ;`);
    res.send(results.data);

  } catch (err) {
    res.status(500).send(err);
  }
});


router.get("/:id", categoryMustExist, async function (req, res) {
  res.send(req.category);

});


// GET the prompts of A CATEGORY
router.get("/:id/prompts", async function (req, res) {
  try {
    const { id } = req.params
    const results = await db(
      `SELECT prompts.id, prompts.description, prompts.requirements, prompts.category_id, users.nickname, categories.name FROM prompts INNER JOIN users ON prompts.user_id = users.id INNER JOIN categories ON prompts.category_id = categories.id WHERE prompts.category_id = ${id};`
    );
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});


router.post("/", userMustBeLoggedIn, async function (req, res) {
  const { name, description } = req.body
  try {
    await db(
      `INSERT INTO categories (name, description, user_id) VALUES ("${name}", "${description}", "${req.user.userId}");`
    );

    const results = await db(
      "SELECT * FROM categories ORDER BY id DESC LIMIT 1;"
    );

    res.status(201).send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put("/:id", userMustBeLoggedIn, async (req, res) => {
  const { name, description } = req.body
  try {
    await db(`UPDATE categories SET name = "${name}", description = "${description}" WHERE id = "${req.params.id}";`);

    const results = await db(`SELECT * FROM categories  WHERE id = ${req.params.id};`);
    res.status(201).send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});


router.delete("/:id", categoryMustExist, userMustBeLoggedIn, async function (req, res) {
  try {
    const results = await db(`DELETE FROM prompts WHERE category_id=${req.params.id}; DELETE FROM categories WHERE id=${req.params.id};`);
    res.send(results.data);

  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;