import {
  GET_ALL_EMPLOYEES_REQUEST,
  GET_ALL_EMPLOYEES_SUCCESS,
  GET_ALL_EMPLOYEES_FAIL,

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


export const getAllEmployeesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_EMPLOYEES_REQUEST:
      return { loading: true };

    case GET_ALL_EMPLOYEES_SUCCESS:
      return { loading: false, allEmployees: action.payload, error:false };

    case GET_ALL_EMPLOYEES_FAIL:
      return { loading: false, allEmployees: [], error: true };

    default:
      return state;
  }
};

export const addEmployeesReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_EMPLOYEE_REQUEST:
      return { loading: true };

    case ADD_EMPLOYEE_SUCCESS:
      return { loading: false, isAdded: true, error:false, payload: action.payload };

    case ADD_EMPLOYEE_FAIL:
      return { loading: false, isAdded: false, error: true, payload: action.payload };

    default:
      return state;
  }
};

export const updateEmployeesReducer = (state = {}, action) => {
  switch (action.type) {
    case PATCH_EMPLOYEES_REQUEST:
      return { loading: true };

    case PATCH_EMPLOYEES_SUCCESS:
      return { loading: false, updatedEmployee: action.payload, error:false };

    case PATCH_EMPLOYEES_FAIL:
      return { loading: false, updatedEmployee: [], error: true };

    default:
      return state;
  }
};


export const deleteEmployeeReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_EMPLOYEE_REQUEST:
      return { loading: true };

    case DELETE_EMPLOYEE_SUCCESS:
      return { loading: false, deleteEmployee: action.payload, deleted: true, error:false };

    case DELETE_EMPLOYEE_FAIL:
      return { loading: false, deleteEmployee: action.payload, error: true, deleted: false };

    default:
      return state;
  }
};