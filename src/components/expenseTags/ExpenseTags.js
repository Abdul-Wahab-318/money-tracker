import React , { useEffect } from 'react'
import './ExpenseTags.css'

import { store } from '../../redux/store'

export default function ExpenseTags() {

  let currentMonth = new Date().getMonth()  
  let transactions = store.getState().transactions

  //TOTAL EXPENSE 
  let totalExpenseTags = new Map()

  transactions.map( transaction => {

    if ( transaction.type === "income" || transaction.type === "transfer" ) return 

    if( totalExpenseTags.has(transaction.to))
    {
      totalExpenseTags.set( transaction.to , totalExpenseTags.get( transaction.to ) + transaction.amount )
    }
    else
    {
      totalExpenseTags.set(transaction.to , transaction.amount)
    }

  })
  //TOTAL EXPENSE END
  
  //MONTHLY EXPENSE
  let monthlyTransactions = [] 
  let monthlyExpenseMap = new Map()
  let populateMonthlyTransactions = () => 
  {
    for ( let el of transactions )
    {
        if ( el.type != "expense" ) continue 

        let transactionMonth = new Date(el.date).getMonth()

        if ( transactionMonth == currentMonth )
        monthlyTransactions.push( el )

    }
  }
  populateMonthlyTransactions()
 

  let populateMonthlyTransactionsMap = () => {

    monthlyTransactions.map ( transaction => {

      if ( monthlyExpenseMap.has( transaction.to ) )
      {
        monthlyExpenseMap.set( transaction.to , monthlyExpenseMap.get( transaction.to ) + transaction.amount )
      }
      else
      {
        monthlyExpenseMap.set( transaction.to , transaction.amount )
      }
    })

  }

  populateMonthlyTransactionsMap()


  console.log( "Monthly expense are : " , [...monthlyExpenseMap.keys()])


  let monthlyExpenseKeys = [ ...monthlyExpenseMap.keys() ]
  let totalExpenseTagKeys  = [...totalExpenseTags.keys()]

  return (
    <section className="expense-tags">
        <div className="expense-tags-inner">

        <section className="monthly-expenses">
            <div className="section-heading">
              <h6 className='mb-0'>Monthly Expense Per Tag</h6>
            </div>
              <div className="expense-tags-cards">
                {
                  monthlyExpenseKeys.map( ( el , ind ) => {
                    return (
                    <div className='imp-info-card justify-content-between d-flex align-items-center' key={el}> 
                      <span className='percent-green fs-6 me-1'>{el} </span>
                      <span> : </span>
                      <span className='expense-amount fs-6 ms-1'>${monthlyExpenseMap.get(el)}</span>
                    </div>)
                  })
                }
              </div>
          </section>

          <section className="total-expenses">
            <div className="section-heading">
              <h6 className='mb-0'>Total Expense Per Tag</h6>
            </div>
              <div className="expense-tags-cards">
                {
                  totalExpenseTagKeys.map( ( key , ind ) => {
                    return (
                    <div className='imp-info-card justify-content-between d-flex align-items-center'  key={ind} >
                      <span className='percent-green fs-6 me-1'>{key} </span>
                      <span> : </span>
                      <span className='expense-amount fs-6 ms-1'>${totalExpenseTags.get(key)}</span>
                    </div>)
                  })
                }
              </div>
          </section>

        </div>
    </section>
  )
}
