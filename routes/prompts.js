var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const promptMustExist = require("../guards/promptMustExist");


router.get("/", async function (req, res) {
  try {
    const results = await db(
      "SELECT prompts.id, prompts.description, prompts.requirements, prompts.category_id, users.nickname, categories.name FROM prompts INNER JOIN users ON prompts.user_id = users.id INNER JOIN categories ON prompts.category_id = categories.id;"
    );
    // SELECT * FROM prompts;
    res.send(results.data);
  } catch (err) {
    res.status(500).send("error: " + err);
  }
});


router.get("/:id", promptMustExist, async function (req, res) {
  res.send(req.prompt);
  // try {
  //   const results = await db(
  //     `SELECT * FROM prompts WHERE prompt_id=${req.params.prompt_id};`
  //   );
  //   res.send(results.data);
  // } catch (err) {
  //   res.status(500).send(err);
  // }

});


router.post("/", async function (req, res) {

  const { description, requirements, user_id, category_id } = req.body

  try {
    await db(
      `INSERT INTO prompts (description, requirements, user_id, category_id) VALUES ("${description}", "${requirements}", "${user_id}", "${category_id}");`
    );

    const results = await db(
      "SELECT prompts.id, prompts.description, prompts.requirements, prompts.category_id, users.nickname, categories.name FROM prompts INNER JOIN users ON prompts.user_id = users.id INNER JOIN categories ON prompts.category_id = categories.id ORDER BY id DESC LIMIT 1;"
    );
    res.status(201).send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});


router.delete("/:id", promptMustExist, async function (req, res) {
  try {
    await db(`DELETE FROM prompts WHERE id=${req.params.id};`);
    const results = await db("SELECT * FROM prompts;");
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
