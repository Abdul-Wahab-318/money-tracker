import React from 'react'
import './NewTransaction.css'
import ExpenseForm from '../expenseForm/ExpenseForm'
import IncomeForm from '../incomeForm/IncomeForm'
import Transfer from '../transfer/Transfer'
export default function NewTransaction() {

    let [activeTransaction , setActiveTransaction ] = React.useState("income")

    let handleToggle = (element)=>{
        setActiveTransaction(element.target.innerText.toLowerCase())
    }

    let showTransactionTable = ()=>{
        switch(activeTransaction){
            
            case "expense":
                return <ExpenseForm/>
            
            case "transfer" : 
                return <Transfer/>

            case "income" :
                return <IncomeForm/>
            
            default:
                return "expense"
        }
    }

    return (
        <div className="new-transaction-component">
            <h4 className="lead-text">New Transaction</h4>
            <div className="transaction-tabs d-flex justify-content-stretch">
                <button 
                className={`transaction-tab ${activeTransaction === "expense" ? "active" : ""}`}
                onClick = {e=> handleToggle(e)}>Expense</button>

                <button 
                className={`transaction-tab ${activeTransaction === "transfer" ? "active" : ""}`}
                onClick = {e=> handleToggle(e)}>Transfer</button>

                <button 
                className={`transaction-tab ${activeTransaction === "income" ? "active" : ""}`}
                onClick = {e=> handleToggle(e)}>Income</button>
            </div>
            <div className="transaction-table">
                {
                    showTransactionTable()
                }
            </div>
        </div>
    )
}
