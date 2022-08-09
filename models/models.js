const mongoose = require("mongoose")

const Schema = mongoose.Schema

//Schema for User Management
const userNamePassword = new Schema({
    user_id: { type: String, unique: true },
    password: { type: String },
    createdAt: { type: Date, default: () => Date.now() },
    expiration: {
        type: Date, default: () => {
            let date = new Date();
            date.setDate(date.getDate() + 30);
            return date
        }
    }
})

//Schema for Student
const studentSchema = new mongoose.Schema({
    stu_id: { type: String },
    name: { type: String },
    dateOfBirth: { type: Date, default: Date.now() },
})

//Schema for Roll No
const rollNoStudent = new mongoose.Schema({
    roll_id: { type: String },
    student_ref: { type: Schema.Types.ObjectId, ref: "Student" },
    student_id: { type: String },
    marks: [
        {
            subject_name: { type: String },
            marks: { type: Number }
        }
    ]
})

//Schema for the class
const classSchema = new Schema({
    class_id: { type: String },
    year: { type: Number },
    class_teacher: { type: String },
    subject_list: [{ type: String }],
    students: [{ type: Schema.Types.ObjectId, ref: "RollNoStudent" }]

});



const Class = mongoose.model("Class", classSchema);
const RollNoStudent = mongoose.model("RollNoStudent", rollNoStudent)
const Student = mongoose.model("Student", studentSchema);
const User = mongoose.model("User", userNamePassword)


module.exports = {
    Student,
    RollNoStudent,
    Class,
    User
}
