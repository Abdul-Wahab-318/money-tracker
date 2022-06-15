import React from 'react'
import './ExpenseTags.css'

import { store } from '../../redux/store'

export default function ExpenseTags() {

  let transactions = store.getState().transactions
  let expenseTags = new Map()

  transactions.map( transaction => {

    if ( transaction.type === "income" || transaction.type === "transfer" ) return 

    if( expenseTags.has(transaction.to))
    {
      expenseTags.set( transaction.to , expenseTags.get( transaction.to ) + transaction.amount )
    }
    else
    {
      expenseTags.set(transaction.to , transaction.amount)
    }

  })


  let expenseTagKeys  = [...expenseTags.keys()]
  return (
    <section className="expense-tags">
        <div className="expense-tags-inner">
          <div className="section-heading">
            <h6 className='mb-0'>Total Expense Per Tag</h6>
          </div>
            <div className="expense-tags-cards">
              {
                expenseTagKeys.map( ( key , ind ) => {
                  return (
                  <div className='imp-info-card justify-content-between d-flex align-items-center' key = {ind} >
                    <span className='percent-green fs-6 me-1'>{key} </span>
                    <span> : </span>
                    <span className='expense-amount fs-6 ms-1'>${expenseTags.get(key)}</span>
                  </div>)
                })
              }
            </div>
        </div>
    </section>
  )
}
