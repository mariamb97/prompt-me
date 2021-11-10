var express = require('express');
var router = express.Router();
const db = require( "../model/helper" );
const promptMustExist = require("../guards/promptMustExist");


/* GET home page. */
router.get( '/', async function ( req, res) {
  try {
    const results = await db( "SELECT * FROM prompts;" );
    res.send( results.data );
  } catch ( err ) {
    res.status(500).send(err);
  }
} );

// GET a prompt from the DB
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
    const results = await db("SELECT * FROM prompts;");
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
