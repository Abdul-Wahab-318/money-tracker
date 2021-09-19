let initialState = { 

    category : [] ,
    incomeTags : [] ,
    categoryTags : [] ,
    subCategoryTags : [],
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
                        id : Math.random().toString(36).slice(2,10),
                        type : 'income',
                        to : action.payload.subCategory ,
                        from : action.payload.tags ,
                        amount : action.payload.amount ,
                        date : new Date().toDateString()
                    }   
                ],
                subCategoryTags : [ {subCategory : action.payload.subCategory , mainCategory : action.payload.to } ],
                incomeTags : [action.payload.tags] ,
                categoryTags : [...state.categoryTags , action.payload.to]

            
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
                            id : Math.random().toString(36).slice(2,10),
                            type : 'income',
                            to : action.payload.subCategory ,
                            from : action.payload.tags ,
                            amount : action.payload.amount ,
                            date : new Date().toDateString()
                        }   
                    ],
                    subCategoryTags : [...new Set( 
                        [
                            ...state.subCategoryTags ,
                            {subCategory : action.payload.subCategory , mainCategory : action.payload.to}
                        ] 
                        )],

                    categoryTags : [...new Set( [...state.categoryTags , action.payload.to] )],
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
                                title : action.payload.subCategory,
                                amount  : action.payload.amount,
                                note : action.payload.note
                            }
                        ]
                    }
                ],
                transactions : [
                    ...state.transactions ,
                    {
                        id : Math.random().toString(36).slice(2,10),
                        type : 'income',
                        to : action.payload.subCategory ,
                        from : action.payload.tags ,
                        amount : action.payload.amount ,
                        date : new Date().toDateString()
                    }   
                ],
                subCategoryTags : [...new Set( 
                    [
                        ...state.subCategoryTags ,
                        {subCategory : action.payload.subCategory , mainCategory : action.payload.to}
                    ] 
                    )],
                categoryTags : [...new Set( [...state.categoryTags , action.payload.to] )],
                incomeTags : [...state.incomeTags , action.payload.tags]

            }
        
        case "ADD_EXPENSE" :

            
            let { mainCategoryName } = action.payload
            let toBeUpdated = state.category.find(el=> el.title === mainCategoryName)
            toBeUpdated.amount -= action.payload.amount

            return {
                ...state ,
                category : [
                    ...state.category.filter(el=> el.title !== mainCategoryName) , // categories that dont need to be changed
                    {
                        ...toBeUpdated,
                        subCategory : toBeUpdated.subCategory.map(el => {
                            if(el.title === action.payload.from)
                            {
                                el.amount -= action.payload.amount
                            }
                            return el
                        })
                    }
                ] ,

                expenseTags : [... new Set([...state.expenseTags , action.payload.tags])] ,
                transactions : [
                    ...state.transactions , 
                    {
                        id : Math.random().toString(36).slice(2,10),
                        type : 'expense',
                        to : action.payload.tags ,
                        from: action.payload.from ,
                        amount : action.payload.amount,
                        date : new Date().toDateString()
                    }
                ]

            
            }


        default : 
        return state

    }

}