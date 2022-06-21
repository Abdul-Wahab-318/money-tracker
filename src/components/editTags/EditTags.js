import React , { useState } from 'react'
import "./EditTags.css"
import { useDispatch } from 'react-redux'
import {store} from "../../redux/store"
import { bindActionCreators } from 'redux';
import save from "../../images/save.png"
import edit from "../../images/edit.png"
import deleteIcon from "../../images/delete.png"
import { useAlert } from "react-alert"

export default function RemoveTags() {

    let alert = useAlert()
    let dispatch = useDispatch() ; 
    let [ expenseTags , setExpenseTags ] = useState( store.getState().expenseTags ) 
    let [ readOnly , setReadOnly ] = useState(true) // will change later
    let [ inputBG , setInputBG ] = useState("bg-error")

    let handleChange = ( text ) => {
        
        // we use id to find the element which we want to change then we access it using index of array

        let newExpenseTags = [...expenseTags]
        newExpenseTags[ text.id ] = text.value 

        setExpenseTags( newExpenseTags ) 
    }

    let deleteTag = ( el ) => {

        let newTags = expenseTags.filter( tag => tag !== el )
        setExpenseTags( newTags )
        dispatch({ type : 'DELETE_EXPENSE_TAGS' , payload : newTags })

        let budget = store.getState()
        localStorage.setItem("budget" , JSON.stringify( budget ) )

        alert.show( " Tag Deleted  ")

    }


    let handleEdit = () => {
        dispatch({ type : 'EDIT_EXPENSE_TAGS' , payload : expenseTags })

        let budget = store.getState()
        localStorage.setItem("budget" , JSON.stringify( budget ) )

        alert.show( " Tag Edited  ")

    }

    let returnInputBG = () => {
        if ( !readOnly ) return "bg-error"
        else return "bg-light"
    }

    let handleToggle = () => {

        setReadOnly(!readOnly)
        setInputBG( returnInputBG() ) 

    }

  return (
    <section className="remove-tags-component">
        <div>
            <div className="remove-tags-inner">
                <h6 className='mb-4'>Edit Expense Tags</h6>
                <div className="expense-tag-field-parent">
                    { expenseTags.map( (el, ind) => 
                    <div className='expense-tag-field d-flex align-items-center' key={ind}> 
                        <input type="text" value={el} id={ind} readOnly= {readOnly}
                        className = {inputBG}
                        onChange = { (e) => handleChange(e.target)}   />
                        <div className=" ms-4 icons">
                            { readOnly ? 
                                <button className='p-2 btn ' onClick={()=> handleToggle()}><img src={edit} width={24} alt="" /></button>
                                :
                                <button className='p-2 btn ' onClick={()=> {handleToggle() ; handleEdit()} }>
                                    <img src={save} width={20} alt="" />
                                </button>
                            }
                            <button className='p-2 ms-2 btn ' onClick = { () => deleteTag(el) }><img src={deleteIcon} width={25} alt="" /></button>
                        </div>
                    </div> ) }

                </div>
            </div>
        </div>
    </section>
  )
}
