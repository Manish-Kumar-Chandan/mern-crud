const mongoose = require("mongoose");
const Validator = require("validatorjs");
const { ValidationError, firstError } = require("../utils/error");
const Schema = mongoose.Schema;


const employeeSchema = new Schema(
    {
      name: {
        type: String,
        required: true
      },
      department:{
        type: String,
        required: true
      },
      salary:{
        type: String,
        required: true
      },

    },
    { timestamps: true }
  );

  const getEmployees = () => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await Employee.find();
        resolve(data);
      } catch (err) {
        console.error(err);
        reject({ message: err.message });
      }
    });
  };

  const addEmployee = (body) => {
    const { name, department, salary } = body;
    const input = {
      name,
      department, 
      salary
    };
  
    const rules = {
      name: "required",
      department : "required", 
      salary: "required" 
    };
  
    const validation = new Validator(input, rules);
  
    return new Promise(async (resolve, reject) => {
      try {
        if (validation.fails()) throw new ValidationError(firstError(validation));
        let data = await new Employee(body).save();
        resolve(data);
      } catch (err) {
        console.error(err);
        reject({ message: err.message });
      }
    });
  };

  const patchEmployee = ({id, name, department, salary}) => {
    const input = {
      id,
      name,
      department, 
      salary
    };
  
    const rules = {
      id: "required",
      name: "required",
      department: "required", 
      salary: "required"
    };
  
    const validation = new Validator(input, rules);
    return new Promise(async (resolve, reject) => {
      try {
        if (validation.fails()) throw new ValidationError(firstError(validation));
        let data = await Employee.findById(id);
        data.name = name;
        data.department = department;
        data.salary = salary;
        await data.save();
        resolve(data);
      } catch (err) {
        console.error(err);
        reject({ message: err.message });
      }
    });
  };

  const deleteEmployeeById = ({id}) => {
    const input = {
      id,
    };
  
    const rules = {
      id: "required",
    };
  
    const validation = new Validator(input, rules);
  
    return new Promise(async (resolve, reject) => {
      try {
        if (validation.fails()) throw new ValidationError(firstError(validation));
        let data = await Employee.findById(id).deleteOne();
        resolve(data);
      } catch (err) {
        console.error(err);
        reject({ message: err.message });
      }
    });
  };

  const Employee = mongoose.model("Employee", employeeSchema);

  module.exports = {
    Employee,
    addEmployee,
    getEmployees,
    patchEmployee,
    deleteEmployeeById
  };

