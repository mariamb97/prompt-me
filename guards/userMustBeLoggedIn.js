var jwt = require("jsonwebtoken");
const supersecret = process.env.SUPER_SECRET;

function userMustBeLoggedIn(req, res, next) {
    const token = req.headers["authorization"]?.replace(/^Bearer\s/, "")
    if (!token) {
        return res.status(401).send({ message: "Please provide a token" })
    }
    jwt.verify(token, supersecret, (error, decoded) => {
        if (error) {
            return res.status(401).send({ message: "Invalid token" })
        }
        req.user = decoded;
        next()
    })
}

module.exports = userMustBeLoggedIn;