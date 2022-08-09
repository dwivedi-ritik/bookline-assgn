const express = require("express")
const bcrypt = require("bcrypt")
const { User } = require("../models/models.js")

const router = express.Router()

router.get("/", (req, res) => {
    res.send("Hello From user route")
})


router.post("/adduser", async (req, res) => {

    const body = req.body
    if (!(body.user_id && body.password)) {
        return res.status(400).send({ error: "add user_id and password in proper format" });
    }

    if (await User.exists({ user_id: body.user_id })) {
        return res.status(404).send({ error: "User already exists" })
    }

    const salt = await bcrypt.genSalt(10);
    body.password = await bcrypt.hash(body.password, salt);

    const newUser = new User({
        user_id: body.user_id,
        password: body.password

    })

    const addedUser = await newUser.save()

    res.status(200).send({
        msg: "User add Succesfully",
        user_info: {
            user_id: addedUser.user_id,
            expirationDate: addedUser.expiration
        }
    })
})

module.exports = router