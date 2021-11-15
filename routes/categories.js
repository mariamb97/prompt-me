var express = require("express");
var router = express.Router();
const db = require( "../model/helper" );
const categoryMustExist = require("../guards/categoryMustExist");


// GET categories. 
router.get( '/', async function ( req, res) {
  try {
    const results = await db( "SELECT * FROM categories;" );
    res.send(results.data);
    
  } catch ( err ) {
    res.status(500).send(err);
  }
} );


// GET category.
router.get( "/:category_id", categoryMustExist, async function ( req, res ) {
  res.send(req.category);
    
//   try {
//     const results = await db(
//       `SELECT * FROM categories WHERE category_id=${req.params.category_id};`
//     );
//     res.send(results.data);
//   } catch (err) {
//     res.status(500).send(err);
//   }
  
  
} );

      // SELECT 
      //   prompts.prompt_description, 
      //   prompts.prompt_requirements, 
      //   prompts.prompt_links, 
      //   users.user_firstname,
      //   categories.category_name,
      // FROM prompts 
      //   INNER JOIN users ON prompts.user_id = users.user_id
      //   INNER JOIN categories ON prompts.category_id = categories.category_id
      // ;

      // ALTER TABLE props MODIFY props_description datatype NOT NULL



// GET the prompts of A CATEGORY
// /categories/id/prompts

router.get("/:id/prompts", async function (req, res) {
  try {
    const { id } = req.params
    // const id = req.params.id
    console.log(`SELECT * FROM prompts WHERE category_id = ${id};`);
    const results = await db(
      `SELECT prompts.prompt_id, prompts.prompt_description, prompts.prompt_requirements, prompts.prompt_links, prompts.category_id, users.user_nickname, categories.category_name FROM prompts INNER JOIN users ON prompts.user_id = users.user_id INNER JOIN categories ON prompts.category_id = categories.category_id WHERE prompts.category_id = ${id};`
    );
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
} );

// INSERT category
router.post("/", async function (req, res) {
  try {
    await db(
      `INSERT INTO categories (category_name, category_description, user_id) VALUES ("${req.body.category_name}", "${req.body.category_description}", "${req.body.user_id}");`
    );

    const results = await db(
      "SELECT * FROM categories ORDER BY category_id DESC LIMIT 1;"
    );

    res.status(201).send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// DELETE a category from the DB
router.delete("/:category_id", categoryMustExist, async function (req, res) {
  try {
    await db(`DELETE FROM categories WHERE category_id=${req.params.category_id};`);
    const results = await db("SELECT * FROM categories;");

    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;