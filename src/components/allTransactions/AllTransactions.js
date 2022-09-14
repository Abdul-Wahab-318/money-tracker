import React , {useState} from 'react'
import { store } from '../../redux/store'
import { useSelector } from 'react-redux'
import "./AllTransactions.css"

export default function AllTransactions() {

    let monthOptions = [
        {
          value :0 ,
          month : "January"
        },
        {
          value :1 ,
          month : "February"
        },
        {
          value :2 ,
          month : "March"
        }
        ,
        {
          value :3 ,
          month : "April"
        }
        ,
        {
          value :4 ,
          month : "May"
        }
        ,
        {
          value :5 ,
          month : "June"
        }
        ,
        {
          value :6 ,
          month : "July"
        }
        ,
        {
          value :7 ,
          month : "August"
        }
        ,
        {
          value :8 ,
          month : "September"
        }
        ,
        {
          value :9 ,
          month : "October"
        }
        ,
        {
          value :10 ,
          month : "November"
        }
        ,
        {
          value :11 ,
          month : "December"
        }
      ] 
    let [currentMonth , setCurrentMonth ] = useState( new Date().getMonth() ) 
    let transactions = useSelector( state => state.budgetReducer.transactions).filter( el => new Date(el.date).getMonth() == currentMonth)
    console.log(transactions)

    let getFullDate = ( date ) => {

        let dateObj = new Date( date )
        return dateObj.getDate() + ` ` + monthOptions[ dateObj.getMonth() ].month  + ` ` + dateObj.getFullYear()  
    }

  return (
    <section className='all-transactions'>
            <div className="section-heading d-flex align-items-center justify-content-between px-1 mb-2">
                <h5 className='m-0'>Transactions</h5>
                <select className='month-drop-box' name="selectedMonth" id="month" value={currentMonth} onChange={ ({target }) => setCurrentMonth(target.value)}>
                    {monthOptions.map( el => <option value={el.value} key={el.value}>{el.month}</option>)}
                </select>
            </div>
        <div className="all-transactions-inner">


            {
              transactions.length == 0 ? <p className='text-center p-3'>No transactions for this month</p> 
              :
              transactions.map( el =>

                <section key={el.id} className="recent-trans-row">
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
                <p className="text-secondary fw-light">{getFullDate(el.date) }</p>
         
                </section> )

            }
  

 
        </div>

    </section>
  )
}
