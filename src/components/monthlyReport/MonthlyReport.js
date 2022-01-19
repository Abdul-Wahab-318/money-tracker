import React from 'react'
import './MonthlyReport.css'

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

    let monthlyEarnings = store.getState().monthlyIncome

    let totalEarning = monthlyEarnings.reduce( ( accum , current ) => accum + current)
    
    let currentMonthEarning = monthlyEarnings[ date.getMonth() ] 
    
    let prevMonthEarning = monthlyEarnings [ prevMonth ]

    console.log(prevMonthEarning)


    const data = {
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

    var options = {        
        cutout: "80%"
     }
   
    
    return (
        <div className='monthly-report-component'>
            <h6>Monthly Report</h6>

            <div className='report-parent'>
                <div className="report-chart">
                    <Doughnut data={data} options={options} />
                    <span>Monthly Earnings</span>
                    <p>${currentMonthEarning}</p>
                </div>
                <div className="report-chart">

                </div>
            </div>

        </div>
    )
}
