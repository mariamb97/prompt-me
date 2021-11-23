var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const promptMustExist = require("../guards/promptMustExist");
const userMustBeLoggedIn = require("../guards/userMustBeLoggedIn")


// router.get("/", async function (req, res) {
//   try {
//     const results = await db(
//       "SELECT prompts.id, prompts.description, prompts.requirements, users.nickname, categories.name FROM prompts INNER JOIN users ON prompts.user_id = users.id INNER JOIN categories ON prompts.category_id = categories.id;"
//     );
//     res.send(results.data);
//   } catch (err) {
//     res.status(500).send("error: " + err);
//   }
// });


// router.get("/:id", promptMustExist, async function (req, res) {
//   res.send(req.prompt);

// });


router.get('/users', userMustBeLoggedIn, async function (req, res) {
  try {
    const { categories } = req.query;

    let results = null;

    if (!categories || !categories.length) {
      results = await db(`SELECT prompts.id, prompts.text, prompts.requirements, prompts.category_id, prompts.favorite, prompts.public, prompts.updated_at, users.nickname, categories.name, categories.description FROM prompts INNER JOIN users ON prompts.user_id = users.id INNER JOIN categories ON prompts.category_id = categories.id  WHERE prompts.user_id="${req.user.userId}" ORDER BY updated_at DESC;`)
    }
    else {
      const categoriesJoined = categories.join(",");
      results = await db(`SELECT prompts.id, prompts.text, prompts.requirements, prompts.category_id, prompts.favorite, prompts.public, prompts.updated_at, users.nickname, categories.name, categories.description FROM prompts INNER JOIN users ON prompts.user_id = users.id INNER JOIN categories ON prompts.category_id = categories.id WHERE prompts.user_id="${req.user.userId}" AND (category_id) IN (${categoriesJoined}) ORDER BY updated_at DESC;`)
    }

    res.send(results.data);

  } catch (err) {
    res.status(500).send(err);
  }
});



router.get('/users/favorites', userMustBeLoggedIn, async function (req, res) {
  try {
    const results = await db(`SELECT prompts.id, prompts.text, prompts.requirements, prompts.category_id, prompts.favorite, prompts.public, prompts.updated_at, users.nickname, categories.name, categories.description FROM prompts INNER JOIN users ON prompts.user_id = users.id INNER JOIN categories ON prompts.category_id = categories.id  WHERE prompts.user_id="${req.user.userId}" AND prompts.favorite = 1 ORDER BY updated_at DESC;`)
    res.send(results.data)
  } catch (err) {
    res.status(500).send(err);
  }
});


router.get('/publics', userMustBeLoggedIn, async function (req, res) {
  try {
    const results = await db(`SELECT prompts.id, prompts.text, prompts.requirements, prompts.category_id, prompts.favorite, prompts.public, prompts.updated_at, users.nickname, categories.name, categories.description FROM prompts INNER JOIN users ON prompts.user_id = users.id INNER JOIN categories ON prompts.category_id = categories.id  WHERE prompts.public = 1 ORDER BY updated_at DESC;`)
    res.send(results.data)
  } catch (err) {
    res.status(500).send(err);
  }
});


router.post("/", userMustBeLoggedIn, async function (req, res) {

  const { text, requirements, category_id } = req.body

  try {
    await db(
      `INSERT INTO prompts (text, requirements, user_id, category_id, favorite, public) VALUES ("${text}", "${requirements}", "${req.user.userId}", "${category_id}", "0", "0");`
    );

    const results = await db(
      `SELECT prompts.id, prompts.text, prompts.requirements, prompts.category_id, prompts.favorite, prompts.public, prompts.updated_at, users.nickname, categories.name, categories.description FROM prompts INNER JOIN users ON prompts.user_id = users.id INNER JOIN categories ON prompts.category_id = categories.id WHERE prompts.user_id="${req.user.userId}" ORDER BY updated_at DESC;`
    );
    res.status(201).send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put("/:id", userMustBeLoggedIn, async (req, res) => {
  const { text } = req.body
  try {
    await db(`UPDATE prompts SET text = "${text}" WHERE id = "${req.params.id}";`);

    const results = await db(`SELECT prompts.id, prompts.text, prompts.requirements, prompts.favorite, prompts.public, prompts.updated_at, users.nickname, categories.name, categories.description FROM prompts INNER JOIN users ON prompts.user_id = users.id INNER JOIN categories ON prompts.category_id = categories.id WHERE prompts.user_id="${req.user.userId}" AND prompts.id="${req.params.id}" ORDER BY updated_at DESC;`);

    res.status(201).send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put("/:id/favorites", userMustBeLoggedIn, async (req, res) => {
  try {
    await db(`UPDATE prompts SET favorite = !favorite WHERE id = "${req.params.id}";`);

    const results = await db(`SELECT prompts.id, prompts.text, prompts.requirements, prompts.favorite, prompts.public, prompts.updated_at, users.nickname, categories.name, categories.description FROM prompts INNER JOIN users ON prompts.user_id = users.id INNER JOIN categories ON prompts.category_id = categories.id WHERE prompts.user_id="${req.user.userId}" AND prompts.id="${req.params.id}" ORDER BY updated_at DESC;`);

    res.status(201).send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put("/:id/publics", userMustBeLoggedIn, async (req, res) => {
  try {
    await db(`UPDATE prompts SET public = !public WHERE id = "${req.params.id}";`);

    const results = await db(`SELECT prompts.id, prompts.text, prompts.requirements, prompts.favorite, prompts.public, prompts.updated_at, users.nickname, categories.name, categories.description FROM prompts INNER JOIN users ON prompts.user_id = users.id INNER JOIN categories ON prompts.category_id = categories.id WHERE prompts.user_id="${req.user.userId}" AND prompts.id="${req.params.id}" ORDER BY updated_at DESC;`);

    res.status(201).send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/:id", promptMustExist, userMustBeLoggedIn, async function (req, res) {
  try {
    const { categories } = req.query;
    let results = null;

    await db(`DELETE FROM prompts WHERE id=${req.params.id};`)

    if (!categories || !categories.length) {
      results = await db(`SELECT prompts.id, prompts.text, prompts.requirements, prompts.favorite, prompts.public, prompts.updated_at, users.nickname, categories.name, categories.description FROM prompts INNER JOIN users ON prompts.user_id = users.id INNER JOIN categories ON prompts.category_id = categories.id WHERE prompts.user_id="${req.user.userId}" ORDER BY updated_at DESC;`)
    }
    else {
      const categoriesJoined = categories.join(",");
      results = await db(`SELECT prompts.id, prompts.text, prompts.requirements, prompts.favorite, prompts.public, prompts.updated_at, users.nickname, categories.name, categories.description FROM prompts INNER JOIN users ON prompts.user_id = users.id INNER JOIN categories ON prompts.category_id = categories.id WHERE prompts.user_id="${req.user.userId}" AND (category_id) IN (${categoriesJoined}) ORDER BY updated_at DESC;`)
    }

    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
