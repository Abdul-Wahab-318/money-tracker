import { React , useState , useEffect } from "react"
import { useDispatch } from "react-redux"
import store from "../redux/store"


export let useSaveUser = ( action ) => {

    let dispatch = useDispatch()
    let [ data , setData ] = useState(action) 

    //delete budget property because userReducer only saves user personal info
    // budget is stored in budgetReducer separately
    let userData = {...data.payload }
    delete userData.budget

    useEffect(() => {

        switch( data.type )
        {
            case 'SAVE_USER_INFO' :    
            {
                dispatch({ type : 'SAVE_USER_INFO' , payload : userData })
                dispatch({ type : "SAVE_BUDGET" , payload : data.payload.budget })
                break
            }
            
            case 'LOGOUT' :
            {
                dispatch( { type : 'LOGOUT' })
                break
            }

        }

    } , [data])
    
    return [ data , setData ]

}

