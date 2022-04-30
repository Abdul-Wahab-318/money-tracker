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
            <h6 className='mb-0'>Expense Tags Statistics</h6>
          </div>
            {/*{
              [...expenseTags.values()].map( (tag , ind) => {
                counter++ ; 
                return <div key = {ind} > {expenseTagKeys[counter]} ${tag} </div>
              })
            }*/}
            <div className="expense-tags-cards">
              {
                expenseTagKeys.map( ( key , ind ) => {
                  return (
                  <div className='imp-info-card' key = {ind} >
                    <h6>{key}</h6>
                    <p>${expenseTags.get(key)}</p>
                  </div>)
                })
              }
            </div>
        </div>
    </section>
  )
}
