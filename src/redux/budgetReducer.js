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
    console.log("SAME SUB CATEGORY FOUND",sameSubCat)
    
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

            state.monthlyExpense[ new Date().getMonth() ] += action.payload.amount

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
                        }).filter( el => el.amount !== 0)
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

            

        case 'TRANSFER' : 
        
            return{
                ...state ,
                category : [    
                    ...state.category.map( el => 
                        {
                            //this should have a bug but it doesnt ¯\_(ツ)_/¯
                            el.subCategory.map( subCat => 
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
                                } )

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

        case 'RESET' :
            return initialState 

        default : 
        return state

    }

}