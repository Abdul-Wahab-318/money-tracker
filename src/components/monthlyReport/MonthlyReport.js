import React from 'react'
import './MonthlyReport.css'
import { VscTriangleUp } from 'react-icons/vsc';
import { VscTriangleDown } from 'react-icons/vsc';
import { store } from '../../redux/store';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

export default function MonthlyReport() {

    const date = new Date()
    let prevMonth

    function getPrevMonth () 
    {
        prevMonth = date.getMonth() - 1 ;

        if( prevMonth < 0 )
        prevMonth = 11 ; 
    }

    getPrevMonth()

    function getPercentChange ( current , prev )
    {
        let loss = false

        let DecimalChange = current / prev  

        if ( DecimalChange < 1 ) // if there is loss
        {
            loss = true 
            DecimalChange = 1 - DecimalChange ; 

        }

        else // if there is profit
        DecimalChange-- 

        return [Math.floor( DecimalChange * 100 ) , loss]

    }

    // EARNING INFO
    let monthlyEarnings = store.getState().monthlyIncome
    
    let currentMonthEarning = monthlyEarnings[ date.getMonth() ] 
    
    let prevMonthEarning = monthlyEarnings [ prevMonth ]

    let [ earningPercentChange , earningLoss ] = getPercentChange( currentMonthEarning , prevMonthEarning )

    // EXPENSE INFO
    let monthlyExpense = store.getState().monthlyExpense 

    let currentMonthExpense = monthlyExpense [ date.getMonth() ]

    let prevMonthExpense = monthlyExpense [ prevMonth ]

    let [ expensePercentChange , expenseLoss ] = getPercentChange( currentMonthExpense , prevMonthExpense )

    const incomeData = {
        labels: [],
        datasets: [
            {
                label: 'Monthly Earnings',
                data: [prevMonthEarning , currentMonthEarning ],
                backgroundColor: [
                    "rgb(86, 100, 210)" , 
                    "rgb(28, 187, 140)",  
                ],
                borderColor: [
                    "transparent"
                ],
                borderWidth: 3,
            },
        ],
    }

    const expenseData = {
        labels: [],
        datasets: [
            {
                label: 'Monthly Expense',
                data: [prevMonthExpense , currentMonthExpense ],
                backgroundColor: [
                    "#dc3545",  
                    "rgb(86, 100, 210)" , 
                ],
                borderColor: [
                    "transparent"
                ],
                borderWidth: 3,
            },
        ],
    }

    var options = {        
        cutout: "80%"
     }
   
    
    return (
        <div className='monthly-report-component'>
            <h6>Monthly Report</h6>

            <div className='report-parent'>
                <div className="report-chart">
                    <div className="chart-container">
                        <Doughnut data={incomeData} options={options} />
                        {earningLoss ? <p className="percent-down-badge"> <VscTriangleDown/> {earningPercentChange}%</p> 
                        : <p className="percent-up-badge"> <VscTriangleUp/> {earningPercentChange}%</p>}
                    </div>
                    <span>Monthly Earnings</span>
                    <p className='text-success'>${currentMonthEarning}</p>
                </div>
                <div className="report-chart">
                    <div className="chart-container">
                        <Doughnut data={expenseData} options={options} />
                        {expenseLoss ? <p className="percent-down-badge"> <VscTriangleDown/> {expensePercentChange}%</p> 
                        : <p className="percent-up-badge"> <VscTriangleUp/> {expensePercentChange}%</p>}
                    </div>
                    <span>Monthly Expense</span>
                    <p className='text-danger'>${currentMonthExpense}</p>
                </div>
            </div>

        </div>
    )
}
