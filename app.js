const mongoose = require("mongoose")
const express = require("express")
const bodyparser = require("body-parser")

const user_route = require("./routers/user_route.js")
const class_route = require("./routers/class_route.js")
const student_route = require("./routers/student_route.js")

const app = express()
app.use(bodyparser.json())

app.use("/user", user_route)
app.use("/student", student_route)
app.use("/class", class_route)


app.get("/", (req, res) => {
    res.send("Hello There")
})


app.listen("3000", async () => {
    const options = {
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        family: 4 // Use IPv4, skip trying IPv6
    }
    mongoose.connect("mongodb://127.0.0.1:27017/test2", options)
        .then(() => {
            console.log("Connections Established")
        })
    console.log("Running on port 3000")
})