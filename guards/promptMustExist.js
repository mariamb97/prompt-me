const db = require("../model/helper");

async function promptMustExist(req, res, next) {
  try {
    const { id } = req.params;
    const results = await db(`SELECT * FROM prompts WHERE id=${id}`);
    if (!results.data.length) {
      return res.status(404).send({ message: "Prompt not found." });
    }
    req.prompt = results.data[0];
    console.log(req.prompt);
    next();
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = promptMustExist;
