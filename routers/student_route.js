const express = require("express")
const { Student } = require("../models/models.js")
const parseDate = require("../utils.js")

const router = express.Router()

router.get("/", (req, res) => {
    res.status(200).send("Hello From user route")
})

router.post("/addstudent", async (req, res) => {
    const body = req.body
    if (!(body.stu_id && body.name && body.dateOfBirth)) {
        return res.status(400)
            .send({ error: "stu_id , name , dateOfBirth must be in proper format" })
    }
    if (await Student.exists({ stu_id: body.stu_id })) {
        return res.status(404).send({ error: "stu_id must be unique" })
    }

    if (!parseDate(body.dateOfBirth)) {
        return res.status(404).send({ error: "date of birth must be in yyyy-mm-d with - delimeter" })
    }

    try {
        const newStudent = new Student({
            stu_id: body.stu_id,
            name: body.name,
            dateOfBirth: parseDate(body.dateOfBirth)

        })

        const addedStudent = await newStudent.save()
        return res.status(200).send(addedStudent)
    }
    catch (e) {
        return res.status(200).send({ error: e.message })
    }

})

module.exports = router