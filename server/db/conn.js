const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/EmployeesData", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connection successful, DB Connected!");
}).catch((e) => {
    console.log("connection denied " + e)
})