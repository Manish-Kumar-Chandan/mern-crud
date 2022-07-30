const {
    addEmployee,
    getEmployees,
    patchEmployee,
    deleteEmployeeById
} = require("../models/employees");

exports.Add = async(req, res) =>{
    try {
        const data = await addEmployee(req.body)
        res.status(200).json(data);
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
}

exports.GetAll = async(req, res) =>{
    try {
        const data = await getEmployees();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
}

exports.Update = async(req, res) =>{
    try {
        const data = await patchEmployee(req.body)
        res.status(200).json(data);
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
}

exports.Delete = async(req, res) =>{
    try {
        await deleteEmployeeById(req.body)
        res.status(200).json();
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
}