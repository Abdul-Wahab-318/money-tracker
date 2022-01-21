import React from 'react'
import { useDispatch } from 'react-redux'

import {store } from '../../redux/store'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './Analytics.css'
import DoughnutChart from '../../components/doughnut/DoughnutChart';
import MonthlyReport from '../../components/monthlyReport/MonthlyReport';



export default function Analytics() {
    
    let prevMonth
    const date = new Date()
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July' , 'August' , 'September' , 'October' , 'November' , 'December'];

    const dispatch = useDispatch()
    let resetBudget = () => {
        dispatch({type : "RESET"})
        localStorage.removeItem("budget")

    }

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
      );    
    let options = { maintainAspectRatio : true } 

    if ( window.innerWidth <= 576 )
    options.maintainAspectRatio = false  


    function getPrevMonth () 
    {
        prevMonth = date.getMonth() - 1 ;

        if( prevMonth < 0 )
        prevMonth = 11 ; 
    }

    getPrevMonth()
    /*let monthlyIncome = store.getState().monthlyIncome 
    let monthlyExpense = store.getState().monthlyExpense 
    let currentMonthProfit = monthlyIncome[ date.getMonth() ] - monthlyExpense[ date.getMonth() ]
    console.log(currentMonthProfit)*/

    // EARNING INFO
    let monthlyEarnings = store.getState().monthlyIncome

    let currentMonthEarning = monthlyEarnings[ date.getMonth() ] 
    
    let prevMonthEarning = monthlyEarnings [ prevMonth ]

    
    
    // EXPENSE INFO
    let monthlyExpense = store.getState().monthlyExpense 
    
    let currentMonthExpense = monthlyExpense [ date.getMonth() ]
    
    let prevMonthExpense = monthlyExpense [ prevMonth ]
    
    // Profit of current month
    let currentMonthProfit = currentMonthEarning - currentMonthExpense



    const incomeExpenseData = {
        labels,
        datasets: [
            {
                label : "Monthly Income",  
                data : monthlyEarnings , 
                backgroundColor: 'rgba(33, 186, 69, 0.5)',
            } 
            ,
            {
                label : "Monthly Expenses",  
                data : monthlyExpense , 
                backgroundColor: 'rgba(255, 0, 0, 0.6)',
            }
        ],
    }
    



    return (
        <div className="analytics-component py-5">

            <div className="analytics-component-inner">

                <section className="left">

                    <div className="imp-info">
                        <div className="imp-info-card">
                            <span>Monthly Profit</span>
                            <p>$ {currentMonthProfit}</p>
                            <div>
                                <span className="percent-green me-2">
                                    2 . 4% 
                                </span>
                                <span>
                                    From previous period
                                </span>
                            </div>
                        </div>
                        <div className="imp-info-card">
                            <span>Number of sales</span>
                                <p>1452</p>
                                <div>
                                    <span className="percent-green me-2">
                                        2 . 4% 
                                    </span>
                                    <span>
                                        From previous period
                                    </span>
                                </div>
                            </div>
                        <div className="imp-info-card">
                            <span>Number of sales</span>
                                <p>1452</p>
                                <div>
                                    <span className="percent-green me-2">
                                        2 . 4% 
                                    </span>
                                    <span>
                                        From previous period
                                    </span>
                                </div>
                            </div>
                    </div>

                    <section className="analytics-chart monthly ">
                        <div className="analytics-inner">
                            <div>
                                <Bar  data={incomeExpenseData} options={options}/>
                            </div>
                        </div>
                    </section>
                </section>

                <section className="right">
                    <section className="analytics-chart monthly ">
                        <div className="analytics-inner">
                            <div>
                                <DoughnutChart/>
                            </div>
                        </div>
                    </section>
                    <section className='monthly-report'>
                        <MonthlyReport earnings = {[currentMonthEarning , prevMonthEarning]} expense = {[currentMonthExpense , prevMonthExpense]}/>
                    </section>
                </section>

            </div>


            <button className="btn btn-danger m-5" onClick={()=> resetBudget()}> Reset Jojo Part 6 style </button>
        </div>
    )
}
