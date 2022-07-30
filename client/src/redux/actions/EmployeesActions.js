import instance from "../../axios";

import {
  GET_ALL_EMPLOYEES_REQUEST,
  GET_ALL_EMPLOYEES_FAIL,
  GET_ALL_EMPLOYEES_SUCCESS,

  ADD_EMPLOYEE_REQUEST,
  ADD_EMPLOYEE_FAIL,
  ADD_EMPLOYEE_SUCCESS,
  
  PATCH_EMPLOYEES_FAIL,
  PATCH_EMPLOYEES_REQUEST,
  PATCH_EMPLOYEES_SUCCESS,

  DELETE_EMPLOYEE_REQUEST,
  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_FAIL
} from "../constants/EmployeesConstants";

export const getAllEmployeesAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ALL_EMPLOYEES_REQUEST,
    });

    //url :  http://localhost:8081/api/employees

    const { data } = await instance.get("/employees");

    dispatch({
      type: GET_ALL_EMPLOYEES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_EMPLOYEES_FAIL,
      payload: error.response.msg,
    });
  }
};

export const addEmployeesAction = (empAddData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_EMPLOYEE_REQUEST,
    });

    //url :  http://localhost:8081/api/employees

    await instance.post("/employee", empAddData);

    dispatch({
      type: ADD_EMPLOYEE_SUCCESS,
      payload: "Added Successfully!",
    });
  } catch (error) {
    dispatch({
      type: ADD_EMPLOYEE_FAIL,
      payload: error.response.data.msg,
    });
  }
};


export const updateEmployeesAction = (updateData, id) => async (dispatch, getState) => {

  updateData.id = id

  try {
    dispatch({
      type: PATCH_EMPLOYEES_REQUEST,
    });

    //url :  http://localhost:8081/api/employee

    const { data } = await instance.patch("/employee",updateData);

    dispatch({
      type:  PATCH_EMPLOYEES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PATCH_EMPLOYEES_FAIL,
    });
  }
};


export const deleteEmployeesAction = (id) => async (dispatch, getState) => {

  let data = {}
  data.id = id

  console.log(data)

  try {
    dispatch({
      type: DELETE_EMPLOYEE_REQUEST,
    });

    //url :  http://localhost:8081/api/employee

    await instance.delete("/employee",{data});

    dispatch({
      type:  DELETE_EMPLOYEE_SUCCESS,
      payload: "SuccessFully Deleted!",
    });
  } catch (error) {
    dispatch({
      type: DELETE_EMPLOYEE_FAIL,
      payload: "Failed To Delete Employee!",
    });
  }
};