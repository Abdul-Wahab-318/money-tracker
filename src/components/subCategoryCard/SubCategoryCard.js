import React , { useState } from 'react'
import {FiEdit} from "react-icons/fi"
import {AiOutlineSave} from "react-icons/ai"
import { useDispatch } from 'react-redux'
import {store} from "../../redux/store"
import { useAlert } from 'react-alert'
import { updateBudget } from '../../api/api'

export default function SubCategoryCard( { el , category } ) {

    const dispatch = useDispatch()
    const alert = useAlert()
    let [ isEditable , setIsEditable ] = useState(false)
    let [ amount , setAmount ] = useState(el.amount)

    let toggleEdit = () => {
        setIsEditable( state => !state )
    }

    let handleEdit = async () => {
        toggleEdit()

        if ( amount == el.amount ) 
        return

        if ( amount == '' || amount < 0 ) 
        {
            alert.error("Invalid amount")
            setAmount( el.amount )
            return
        }

        dispatch( { type : "UPDATE_AMOUNT" , payload : { newSubCategory : { ...el , amount } , category , oldAmount : el.amount  } })
        let state = store.getState().budgetReducer
            
        await updateBudget( state )
        localStorage.setItem("budget" , JSON.stringify(state) )
        
        alert.success("Amount Edited")
    }

    let handleEnter = async ( key ) => {
        if ( key === 'Enter' )
        handleEdit()
    }

  return (
    <div>
        <p className='my-1'>{el.title} </p>
        <div className='d-flex justify-content-end align-items-center my-1' >
            {
                isEditable ? 
                <>
                <AiOutlineSave color='gray' onClick={()=> handleEdit() } /> 
                <input className="text-green mb-0 ms-2 border-top-0 border-start-0 border-end-0 w-50 editable-amount-field"
                type={"number"}
                min = {0}
                onKeyDown={(el)=>handleEnter(el.key)}
                onChange={( el ) => setAmount( el.currentTarget.value ) }
                
                 value={amount}/>
                </>
                :
                <>
                <FiEdit color='gray' onClick={()=> toggleEdit() } />
                <p className="text-green mb-0 ms-2">{el.amount} PKR </p>
                </>
            }
        </div>
    </div>
  )
}
