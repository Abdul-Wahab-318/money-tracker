import React from 'react'
import './ExpenseTags.css'

import { store } from '../../redux/store'

export default function ExpenseTags() {

  let transactions = store.getState().transactions
  let expenseTags = new Map()

  transactions.map( transaction => {

    if ( transaction.type === "income" || transaction.type === "transfer" ) return 

    if( expenseTags.has(transaction))
    {
      expenseTags[transaction.to] += transaction.amount
    }
    else
    {
      expenseTags.set(transaction.to , transaction.amount)
    }

  })

  console.log(expenseTags)

  console.log(transactions)

  return (
    <section className="expense-tags">
        <div className="expense-tags-inner">
            <h6>Expense Tags Statistics</h6>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam incidunt impedit velit blanditiis mollitia ipsum praesentium facilis quisquam eaque, harum adipisci necessitatibus aut quae nesciunt? Laboriosam ipsam dolor blanditiis quae.
        </div>
    </section>
  )
}
