const db = require("../model/helper");

async function categoryMustExist(req, res, next) {
  try {
    const { id } = req.params;
    const results = await db(`SELECT * FROM categories WHERE id=${id}`);
    if (!results.data.length) {
      return res.status(404).send({ message: "Category not found." });
    }
    req.category = results.data[0];
    next();
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = categoryMustExist;
