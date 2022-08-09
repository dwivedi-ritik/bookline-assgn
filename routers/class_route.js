const express = require("express")

const { Class, RollNoStudent, Student } = require("../models/models.js")

const router = express.Router()

router.get("/", (req, res) => {
    res.send("Hello From user route")
})

router.post("/addclass", async (req, res) => {
    const body = req.body
    let classId = Object.keys(body)[0]
    let classStructure = {
        class_id: classId,
        year: body[classId].Year,
        class_teacher: body[classId].Class_teacher,
        subject_list: body[classId].Subject_list
    }
    let allStudentOfClass = []

    let classStudents = body[classId].Students

    //Queue To Add Student By Roll No
    let classStudentQueue = []

    for (let rollNo in classStudents) {
        let classSt = {
            roll_id: rollNo,
        }

        let stuId = classStudents[rollNo].Student_id
        // Validation to see if student with stu_id already exists or not
        if (! await Student.exists({ stu_id: stuId })) {
            return res.status(400).send({ error: `${stuId} is not a student add first` })
        }

        let studentRef = await Student.findOne({ stu_id: stuId })
        classSt.student_ref = studentRef
        classSt.student_id = stuId

        let temp = []
        for (let subject in classStudents[rollNo].Marks) {
            temp.push({
                subject_name: subject,
                marks: classStudents[rollNo].Marks[subject]
            })

        }
        classSt.marks = temp
        classStudentQueue.push(classSt)
    }

    for (let obj of classStudentQueue) {
        const newClassStudent = new RollNoStudent(obj)
        const addStudentOfClass = await newClassStudent.save()
        allStudentOfClass.push(addStudentOfClass)
    }

    classStructure.students = allStudentOfClass

    const newClass = new Class(classStructure)
    const addedClass = await newClass.save()
    res.status(200).send(await addedClass.populate())

})


router.post("/getScore", async (req, res) => {
    const body = req.body
    if (!(body.class && body.subject)) {
        return res.status(400).send({ error: "Invalid Attributes" })
    }
    let result = await Class.findOne({ class_id: body.class })
    if (result == null) {
        return res.status(400).send({ error: "Null response with given class name" })
    }
    result = await result.populate('students')
    const temp = []
    result.students.forEach(p_obj => {
        p_obj.marks.forEach(obj => {
            if (obj.subject_name === body.subject) {
                temp.push(p_obj)
            }
        })
    })

    return res.status(200).send(temp)

})

// Get all the entries from the RollNoStudent 
router.get("/roll", async (req, res) => {
    let o = await RollNoStudent.find()
    let resArr = []
    for (let a of o) {
        resArr.push(await a.populate('student_ref'))
    }
    return res.send(resArr)
})


module.exports = router