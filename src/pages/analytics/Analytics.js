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
      

      
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July' , 'August' , 'September' , 'October' , 'November' , 'December'];

    let monthlyIncome = store.getState().monthlyIncome 
    let monthlyExpense = store.getState().monthlyExpense 

    const incomeData = {
    labels,
    datasets: [
        {
        label : "Monthly Income",  
        data : monthlyIncome , 
        backgroundColor: 'rgba(33, 186, 69, 0.5)',
        } 
    ],
    }

    const incomeExpenseData = {
        labels,
        datasets: [
            {
                label : "Monthly Income",  
                data : monthlyIncome , 
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
                                <Bar  data={incomeExpenseData}/>
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
                        <MonthlyReport/>
                    </section>
                </section>

            </div>


            <button className="btn btn-danger m-5" onClick={()=> resetBudget()}> Reset Jojo Part 6 style </button>
        </div>
    )
}
