const db = require("../model/helper");

async function userMustExist(req, res, next) {
  try {
    const { user_id } = req.params;
    const results = await db(
      `SELECT * FROM users WHERE user_id=${user_id}`
    );
    if (!results.data.length) {
      return res.status(404).send({ message: "User not found." });
    }
    req.user = results.data[0];
    next();
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = userMustExist;
