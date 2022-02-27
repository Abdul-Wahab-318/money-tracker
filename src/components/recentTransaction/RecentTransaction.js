import React from 'react'
import './RecentTransaction.css'
import { useSelector } from 'react-redux'
import { store } from '../../redux/store'


export default function RecentTransaction() {

    let recentEntries = useSelector(state => state.transactions).slice(-6 )
    console.log(recentEntries , "recent")
    let arr=  [ 1 , 2 , 3 , 4, 5 , 6 ]
    console.log(arr.slice(-2))
    return (
        <div className="recent-transaction-component">
            <h4 className="lead-text">Recent Transactions</h4>
            <main className="recent-transaction-inner">
                { 
                recentEntries.length === 0 ?  <div className="skeleton">No Recent Transactions</div>
                :               
                recentEntries.map( (el,ind) => 
                <section key={ind} className="recent-trans-row ">
                    <div className="caption d-flex justify-content-between">
                        <div>
                            <span>{el.from}</span>
                            <i className="bi bi-arrow-right-circle-fill mx-4"></i>
                            <span className="to-bg">{el.to}</span>
                        </div>
                        <div className="amount d-block mt-2">
                            <span className="d-inline d-sm-none me-3 ">Amount : </span>
                            <span className={`${el.type === 'income' ? 'text-green' : 'text-danger' }`}>{el.amount} PKR</span>
                        </div>
                    </div>
                    <p className="text-secondary fw-light">{el.date}</p>
             
                </section> 
                )}
            </main>
        </div>
    )
}
