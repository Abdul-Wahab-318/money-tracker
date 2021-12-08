import React from 'react'
import { useDispatch } from 'react-redux'

export default function Analytics() {


    const dispatch = useDispatch()
    let resetBudget = () => {
        dispatch({type : "RESET"})
        localStorage.removeItem("budget")
    }

    return (
        <div>
            <h1>UNDER DEVELOPMENT ... </h1>
            <h3>Dangerous !</h3>
            <button className="btn btn-danger m-5" onClick={()=> resetBudget()}> Reset Jojo Part 6 style </button>
        </div>
    )
}
