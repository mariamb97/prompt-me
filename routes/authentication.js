var express = require("express");
var router = express.Router();
var db = require("../model/helper");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
require("dotenv").config();
const saltRounds = 10
const supersecret = process.env.SUPER_SECRET;

router.get("/", (req, res) => {
    res.send("Welcome to the API");
});

router.post("/register", async (req, res) => {
    const { nickname, email, firstname, lastname, password } = req.body

    try {
        const hash = await bcrypt.hash(password, saltRounds)

        await db(`INSERT INTO users (nickname, email, firstname, lastname, password) VALUES ("${nickname}", "${email}", "${firstname}", "${lastname}","${hash}" );`)

        res.send({ message: "Register successful" })
    }
    catch (error) {
        res.status(400).send({ message: error.message })
    }
})

router.post("/login", async (req, res) => {
    const { nickname, password } = req.body;
    try {
        const results = await db(
            `SELECT * FROM users WHERE nickname = "${nickname}"`
        );
        const user = results.data[0];
        if (user) {
            const userId = user.id;

            const correctPassword = await bcrypt.compare(password, user.password);

            if (!correctPassword) throw new Error("Incorrect password");

            var token = jwt.sign({ userId }, supersecret);
            res.send({ message: "Login successful, here is your token", token });
        } else {
            throw new Error("User does not exist");
        }
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

module.exports = router;