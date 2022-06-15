import React , { useState } from 'react'
import "./RemoveTags.css"
import { useDispatch } from 'react-redux'
import {store} from "../../redux/store"
import { bindActionCreators } from 'redux';

export default function RemoveTags() {

    let dispatch = useDispatch() ; 
    let [ expenseTags , setExpenseTags ] = useState( store.getState().expenseTags ) 
    let [ isEditable , setIsEditable ] = useState(true) // will change later

    let handleChange = ( text ) => {
        
        // we use id to find the element which we want to change then we access it using index of array

        let newExpenseTags = [...expenseTags]
        newExpenseTags[ text.id ] = text.value 

        setExpenseTags( newExpenseTags ) 
    }

    let handleSubmit = () => {
        dispatch({ type : 'EDIT_EXPENSE_TAGS' , payload : expenseTags })
    }

    console.log(expenseTags)
  return (
    <section className="remove-tags-component">
        <div>
            <div className="remove-tags-inner">
                <h6 className='mb-4'>Edit Expense Tags</h6>
                { expenseTags.map( (el, ind) => 
                <div className='expense-tag-field' key={ind}> 
                    <input type="text" value={el} id={ind} contentEditable ={isEditable} 
                    onChange = { (e) => handleChange(e.target)}   /> 
                </div> ) }
                <button className='btn' style={{"backgroundColor" : "rgba(28,187,140,.18)"}} onClick={()=>handleSubmit()}>
                    Submit
                </button>
            </div>
        </div>
    </section>
  )
}
