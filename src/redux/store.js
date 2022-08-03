import { createStore , combineReducers } from "redux";
import { budgetReducer } from "./budgetReducer";
import { userReducer } from "./userReducer";


let rootReducer = combineReducers({ budgetReducer , userReducer })

export let store = createStore(  rootReducer , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())