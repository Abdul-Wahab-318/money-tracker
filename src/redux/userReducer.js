let initialState = {
    firstName : "" , 
    lastName : "" , 
    email : "" , 
    password  : "" , 
    DOB : "" ,
}

export let userReducer = ( state = initialState , action ) => {


    switch ( action.type )
    {

        case 'SAVE_USER_INFO' : 
        return {
            ...action.payload
        }

        case 'LOGOUT' : 
            return initialState

        default : 
        return state
    }
}