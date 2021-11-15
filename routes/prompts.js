var express = require('express');
var router = express.Router();
const db = require( "../model/helper" );
const promptMustExist = require("../guards/promptMustExist");

/* GET prompts. */
router.get( '/', async function ( req, res) {
  try {
    const results = await db(
      "SELECT prompts.prompt_id, prompts.prompt_description, prompts.prompt_requirements, prompts.prompt_links, prompts.category_id, users.user_nickname, categories.category_name FROM prompts INNER JOIN users ON prompts.user_id = users.user_id INNER JOIN categories ON prompts.category_id = categories.category_id;"
    );

    /*
      SELECT 
        prompts.prompt_description, 
        prompts.prompt_requirements, 
        prompts.prompt_links, 
        users.user_firstname,
        categories.category_name,
      FROM prompts 
        INNER JOIN users ON prompts.user_id = users.user_id
        INNER JOIN categories ON prompts.category_id = categories.category_id
      ;

    */
    // SELECT * FROM prompts;
    res.send(results.data);
  } catch ( err ) {
    res.status(500).send("error: "+err);
  }
} );

// GET a prompt.
router.get("/:prompt_id", promptMustExist, async function (req, res) {
  res.send( req.prompt );
  
  // try {
  //   const results = await db(
  //     `SELECT * FROM prompts WHERE prompt_id=${req.params.prompt_id};`
  //   );
  //   res.send(results.data);
  // } catch (err) {
  //   res.status(500).send(err);
  // }

});

// POST a new prompt into the DB
router.post("/", async function(req, res) {
  try {
    await db(
      `INSERT INTO prompts (prompt_description, prompt_requirements, prompt_links, category_id, user_id) VALUES ("${req.body.prompt_description}", "${req.body.prompt_requirements}", "${req.body.prompt_links}", "${req.body.category_id}", "${req.body.user_id}");`
    );
    const results = await db(
      "SELECT prompts.prompt_id, prompts.prompt_description, prompts.prompt_requirements, prompts.category_id, users.user_nickname, categories.category_name FROM prompts INNER JOIN users ON prompts.user_id = users.user_id INNER JOIN categories ON prompts.category_id = categories.category_id ORDER BY prompt_id DESC LIMIT 1;"
      // "SELECT * FROM prompts ORDER BY prompt_id DESC LIMIT 1;"
      /*


SELECT 
  prompts.prompt_id, 
  prompts.prompt_description, 
  prompts.prompt_requirements, 
  prompts.prompt_links, 
  prompts.category_id, 
  users.user_nickname, 
  categories.category_name 
FROM 
  prompts 
ORDER BY prompt_id DESC LIMIT 1
INNER JOIN users 
  ON prompts.user_id = users.user_id 
INNER JOIN categories 
  ON prompts.category_id = categories.category_id;

*/
    );
    res.status(201).send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
} );


// DELETE a prompt from the DB
router.delete("/:prompt_id", promptMustExist, async function(req, res) {
  try {
    await db(`DELETE FROM prompts WHERE prompt_id=${req.params.prompt_id};`);
    const results = await db("SELECT * FROM prompts;");
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
} );

// req.params.prompt_id


module.exports = router;
