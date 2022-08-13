import URL from "../api"
import { store } from "../redux/store"

let isLoggedIn = store.getState().userReducer._id

export let updateBudget = async ( body ) => {

    if ( !isLoggedIn ) 
    return 

    try{
        await fetch(`${URL}/budget/updateBudget` ,
        { 
           method : "PUT" , 
           credentials : "include" , 
           headers : { "Content-type" : "application/json"} ,
           body : JSON.stringify(body)
       })
       .then( data => data.json() )
       .then( response => console.log( "updateBudget response : " , response ))

    }catch (err)
    {
        console.log(err)
    }
}

export let logout = async () => {

    try{
        await fetch(`${URL}/user/logout` , { method : "POST" , credentials : 'include' ,headers:{"Content-type": "application/json"} })
        .then( data => data.json())
        .then( response => console.log(response))
    }
    catch(err)
    {
        console.log(err)
    }

}