/* Ignore this file only for checking and fixing bugs */
// const mongoose = require("mongoose")

// const Schema = mongoose.Schema

// const studentSchema = new mongoose.Schema({
//     stu_id: { type: String },
//     name: { type: String },
//     dateOfBirth: { type: Date, default: Date.now() },

// })
// const rollNoStudent = new mongoose.Schema({
//     roll_id: { type: String },
//     student_ref: { type: Schema.Types.ObjectId, ref: "Student" },
//     student_id: { type: String },
//     marks: [
//         {
//             subject_name: { type: String },
//             marks: { type: Number }
//         }
//     ]
// })

// const classSchema = new Schema({
//     class_id: { type: String },
//     year: { type: Number },
//     class_teahcer: { type: String },
//     subject_list: [{ type: String }],
//     students: [rollNoStudent]

// });

// const Class = mongoose.model("Class", classSchema);
// const RollNoStudent = mongoose.model("RollNoStudent", rollNoStudent)
// const Student = mongoose.model("Student", studentSchema);

// (async () => {
//     mongoose.connect("mongodb://127.0.0.1:27017/test")
//         .then(() => console.log("Connection Established"))

//     let dummy = {
//         Roll1: {
//             Student_id: "stu_1",
//             Marks: {
//                 Physics: 55,
//                 Chemistry: 75
//             }
//         },
//         Roll2: {
//             Student_id: "stu_2",
//             Marks: {
//                 Physics: 75,
//                 Maths: 90,
//                 PT: 55,
//                 Chemistry: 90
//             }
//         }
//     }

//     let allStudentByRollNo = []
//     for (let key in dummy) {
//         let marks = []
//         for (k in dummy[key].Marks) {
//             marks.push({ subject_name: k, marks: dummy[key].Marks[k] })
//         }
//         let data = {
//             roll_id: key,
//             student_id: dummy[key].Student_id,
//             marks: marks
//         }
//         let newRollStudent = new RollNoStudent(data)
//         await newRollStudent.save()
//         allStudentByRollNo.push(newRollStudent)
//     }
//     const newClass = new Class({
//         class_id: "class2",
//         year: 2020,
//         class_teacher: "Langad2",
//         subject_list: [
//             "Physics", "Chemistry", "Math", "PT"
//         ],
//         students: allStudentByRollNo
//     })

//     await newClass.save()

//     // console.log(await newClass.populate())

// })()