import { createStore } from "redux";
import { budgetReducer } from "./budgetReducer";




export let store = createStore(budgetReducer , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())