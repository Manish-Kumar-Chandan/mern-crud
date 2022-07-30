import { applyMiddleware,legacy_createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {getAllEmployeesReducer, addEmployeesReducer ,updateEmployeesReducer, deleteEmployeeReducer} from './reducers/employeesReducer';

const reducer = combineReducers({
    getAllEmployeesReducer,
    addEmployeesReducer,
    updateEmployeesReducer,
    deleteEmployeeReducer
})
const initialState = {}

const middleware = [thunk]
const store = legacy_createStore(reducer,initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store