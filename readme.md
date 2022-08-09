## Bookline Assignment 

|task  |Task 1 |Task 2| Task3|
|------|-------|----- |----|
|description| Added user with hashed password| Add Student | Add Class information| Get Score of class|
|method|`POST`                               | `POST`| `POST`| `POST`|
|endpoint| `/user/adduser`                   | `/student/addstudent`|`/class/addclass`|`/class/getScore`|
|body|`{user_id:your_user_id , password:password}`|`{stu_id:id, name:name, dateOfBirth:yyyy-mm-dd}`|`json_body`|`{class:class_id , subject:subject_name}`|
|file| `routers/user_route.js`|`routers/student_route.js`|`routers/class_route.js`|`routers/class_route.js`

## Contraints
- To add student into the class first you have to register them in `/student/addstudent`..

I left out the validations of the APIs and their responses as its not mention in the assignment.