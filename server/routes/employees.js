const express = require("express");
const router = express.Router();
const EmployeeController = require("../controller/employee");

router.post("/employee", EmployeeController.Add);

router.get("/employees", EmployeeController.GetAll);

router.patch("/employee", EmployeeController.Update);

router.delete("/employee", EmployeeController.Delete);

module.exports = router;