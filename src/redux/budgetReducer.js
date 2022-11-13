let initialState = { 

    category : [] ,
    incomeTags : [] ,
    categoryTags : [] ,
    subCategoryTags : [],
    expenseTags : [] ,
    transactions : [],
    monthlyIncome : new Array(12).fill(0) , 
    monthlyExpense : new Array(12).fill(0) , 
}
  
let initialBudget = localStorage.getItem("budget") ? JSON.parse( localStorage.getItem("budget") ) : initialState 

let isSameCategory = (state , action)=>{


   let repeatedCat = state.category.find(el => el.title === action.payload.to)
   if(!repeatedCat) return false

   let updatedCat = updateCategory(repeatedCat ,action)

   return updatedCat

}

let isSameSubCategory = ( repeatedCategory , action )=>{

    let sameSubCat = repeatedCategory.subCategory.find( subCat => subCat.title === action.payload.subCategory)
    return sameSubCat

}

let updateCategory = (category , action)=>{

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

let getSubCategoryTags = ( state , newTag ) => {

    if ( state.subCategoryTags.every( tag => tag.subCategory !== newTag.subCategory ))
    return [
        ...state.subCategoryTags , 
        { ...newTag }
    ]
    else
    return state.subCategoryTags

} 

export let budgetReducer = (state = initialBudget , action) => {

    switch(action.type){

        case 'ADD_INCOME' :

            let isSameCat = isSameCategory(state , action)
            state.monthlyIncome[ new Date().getMonth()] += action.payload.amount
            if(isSameCat)    /// IF CATEGORY Already EXISTS
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
                    subCategoryTags : getSubCategoryTags( state ,{ subCategory : action.payload.subCategory , mainCategory : action.payload.to}),
                    categoryTags : [...new Set( [...state.categoryTags , action.payload.to] )],
                    incomeTags : [ ... new Set( [...state.incomeTags , action.payload.tags] )]
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
                subCategoryTags : getSubCategoryTags( state ,{ subCategory : action.payload.subCategory , mainCategory : action.payload.to}  ),
                categoryTags : [...new Set( [...state.categoryTags , action.payload.to] )],
                incomeTags : [ ... new Set( [...state.incomeTags , action.payload.tags] )]

            }
        
        case "ADD_EXPENSE" :
            console.log("ADDING EXPENSE")
            state.monthlyExpense[ new Date().getMonth() ] += action.payload.amount

            let { mainCategoryName } = action.payload
            let toBeUpdated = state.category.find(el=> el.title === mainCategoryName)
            toBeUpdated.amount -= action.payload.amount
            toBeUpdated.subCategory = toBeUpdated.subCategory.map(el => {
                
                if(el.title === action.payload.from)
                    el.amount -= action.payload.amount

                return el

            }).filter( el => el.amount > 0 )

            return {
                ...state ,
                category : [
                    ...state.category.filter(el=> ( el.title !== mainCategoryName ) ) , // categories that dont need to be changed
                    {
                        ...toBeUpdated
                    }
                ].filter( el => el.amount > 0 ),

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

        case 'TRANSFER' : 
        
            return{
                ...state ,
                category : [    
                    ...state.category.map( el => 
                        {
                            el.subCategory = el.subCategory.map( subCat => 
                                {
                                    if( subCat.title == action.payload.from  && subCat.amount < action.payload.amount )
                                    {
                                        throw "Transfer amount exceeds category amount"
                                    }
              
                                  else if( subCat.title == action.payload.from  && subCat.amount >= action.payload.amount )
                                  {
                                      el.amount -= action.payload.amount
                                      subCat.amount -= action.payload.amount
                                  }  

                                  else if ( subCat.title == action.payload.to )
                                  {
                                      el.amount += action.payload.amount 
                                      subCat.amount += action.payload.amount
                                  }

                                  return subCat
                                } 
                                ).filter( subCat => subCat.amount > 0 )

                                return el
                        }
                    )

                ],
                transactions : [
                    ...state.transactions , 
                    {
                        id : Math.random().toString(36).slice(2,10),
                        type : 'transfer',
                        to : action.payload.to ,
                        from: action.payload.from ,
                        amount : action.payload.amount,
                        date : new Date().toDateString()
                    }
                ],

            }

        case 'EDIT_EXPENSE_TAGS' :
           return  {
                ...state ,
                expenseTags : action.payload
            }

        case 'DELETE_EXPENSE_TAGS' :
            return  {
                    ...state ,
                    expenseTags : action.payload
                }
        
        case 'DELETE_SUBCATEGORY_TAGS' :
            return  {
                    ...state ,
                    subCategoryTags : action.payload
                }

        
        case 'SAVE_BUDGET' : 
            return {
                ...action.payload , 
            }

        case 'UPDATE_AMOUNT' : 
        let {newSubCategory} = action.payload 
        return {
            ...state ,
            category : state.category.map( el => {

                if ( el.title == action.payload.category )
                {
                    el.subCategory = el.subCategory.map( subEl => {
                        if ( subEl.title == newSubCategory.title )
                        { 
                            return newSubCategory 
                        }

                        return subEl 
                    })

                    let amountDifference = parseInt( newSubCategory.amount ) - parseInt( action.payload.oldAmount )
                    el.amount = parseInt(el.amount) + amountDifference

                }

                return el

            })

        }
        
        case 'LOGOUT' : 
            return initialState

        case 'RESET' :
            return initialState 

        default : 
        return state

    }

}