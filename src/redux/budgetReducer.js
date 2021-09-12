let initialState = { 

    category : [] ,
    incomeTags : [] ,
    expenseTags : [] ,
    transactions : [],
    transfers : [] 
}


let isSameCategory = (state , action)=>{


   let repeatedCat = state.category.find(el => el.title === action.payload.to)
   console.log("FOUND REPEATED CATEGORY")
   if(!repeatedCat) return false

   let updatedCat = updateCategory(repeatedCat ,state ,action)

   return updatedCat

}

let doesSubCategoryExist = (action)=>{
    if( 'subCategory' in action.payload == false)  //IF NO SUB CATEGORY
    return false

    return true
}

let isSameSubCategory = ( repeatedCategory , action )=>{

    let sameSubCat = repeatedCategory.subCategory.find( subCat => subCat.title === action.payload.subCategory)
    console.log("SAME SUB CATEGORY FOUND",sameSubCat)
    
    return sameSubCat

}

let updateCategory = (category , state , action)=>{

    console.log("UPDATING CATEGORY")

    if(doesSubCategoryExist(action)) // IF SUB CATEGORY EXISTS THEN CHECK IF IT IS SAME OR NEW
    {
        console.log("SUB CATEGORY EXISTS")
        let sameSubCategory = isSameSubCategory(category , action)
        if( sameSubCategory )   //SAME SUB CATEGORY
        {
            //TAKE OUT ALL THE SUBCATEGORIES WHICH ARE NOT SAME AND ADD THE UPDATED SUB CATEGORY WHICH WAS SAME
            return {
                ...category ,
                amount: category.amount + action.payload.amount,
                subCategory : [
                    ...category.subCategory.filter( subCat => subCat.title !== action.payload.subCategory ) ,
                     {...sameSubCategory , amount : sameSubCategory.amount + action.payload.amount}
                    ]  
                }
        }
        else  // NEW SUB CATEGORY
        {
            return {
                ...category ,
                amount: category.amount + action.payload.amount,
                subCategory : [
                    ...category.subCategory ,
                    {
                        title : action.payload.subCategory,
                        amount : action.payload.amount,
                        note : action.payload.note
                    }
                ]
            }
        }

    }

    else  //NO SUB CATEGORY
    {
        return{
            ...category,
            amount: category.amount + action.payload.amount,
        }
    }

}


export let budgetReducer = (state = initialState , action) => {

    switch(action.type){

        case "ADD_FIRST_INCOME" :
            return {
                ...state ,
                category : [ 
                    {
                        title: action.payload.to ,
                        amount: action.payload.amount,
                        subCategory : [ 
                            {
                                title : action.payload.subCategory ,
                                amount : action.payload.amount ,
                                note : action.payload.note
                            } 
                        ]
                        
                    }

                ],
                transactions : [
                    {
                        to : action.payload.to ,
                        from : action.payload.tags ,
                        amount : action.payload.amount ,
                        date : new Date().toDateString()
                    }   
                ],
                incomeTags : [action.payload.tags]

            
            }


        case 'ADD_INCOME' :

            let isSameCat = isSameCategory(state , action)
            
            if(isSameCat)    /// IF CATEGORY EXISTS
            {
                return {
                    ...state,
                    category : [
                        ...state.category.filter( cat => cat.title !== action.payload.to ) ,
                        isSameCat
                    ],
                    transactions : [
                        ...state.transactions ,
                        {
                            to : action.payload.to ,
                            from : action.payload.tags ,
                            amount : action.payload.amount ,
                            date : new Date().toDateString()
                        }   
                    ],
                    incomeTags : [...state.incomeTags , action.payload.tags]
                }
            }

            return {
                ...state ,
                category : [ 
                    ...state.category ,
                    {
                        title : action.payload.to,
                        amount: action.payload.amount,
                        subCategory : [
                            {
                                title : action.payload.to,
                                amount  : action.payload.amount,
                                note : action.payload.note
                            }
                        ]
                    }
                ],
                transactions : [
                    ...state.transactions ,
                    {
                        to : action.payload.to ,
                        from : action.payload.tags ,
                        amount : action.payload.amount ,
                        date : new Date().toDateString()
                    }   
                ],
                incomeTags : [...state.incomeTags , action.payload.tags]

            }


        default : 
        return state

    }

}