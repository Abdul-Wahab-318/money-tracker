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
import { VscTriangleUp } from 'react-icons/vsc';
import { VscTriangleDown } from 'react-icons/vsc';


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

    // does not maintain aspect ratio for smaller screens
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
    
    // EARNING INFO
    let monthlyEarnings = store.getState().monthlyIncome
    
    let currentMonthEarning = monthlyEarnings[ date.getMonth() ] 
    
    let prevMonthEarning = monthlyEarnings [ prevMonth ]
    
    
    
    // EXPENSE INFO
    let monthlyExpense = store.getState().monthlyExpense 
    
    let currentMonthExpense = monthlyExpense [ date.getMonth() ]
    
    let prevMonthExpense = monthlyExpense [ prevMonth ]
    
    // Profit and expense of current month
    let currentMonthProfit = currentMonthEarning - currentMonthExpense
    
    // Profit of previous month 
    let prevMonthProfit = prevMonthEarning - prevMonthExpense 
    
    function getPercentChange ( current , prev )
    {
        let loss = false
        
        if ( prev == 0 )
        return [0 , loss]
        
        let DecimalChange = current / prev  
        
        if ( DecimalChange < 1 ) // if there is loss
        {
            loss = true 
            DecimalChange = 1 - DecimalChange ; 
            
        }
        
        else // if there is profit
        DecimalChange-- 
        
        return [Math.floor( Math.abs( DecimalChange * 100 ) ) , loss]
        
    }
    
    let [ profitPercentChange , loss ] = getPercentChange( currentMonthProfit , prevMonthProfit )
    
    let categories = store.getState().category
    
    // returns object containing most popular category
    let getPopularCategory = ( ) => {
        let highest = { amount : 0 }
        let popularIndex = 0 
        let index = 0 
        for ( let cat of categories )
        {
            if ( highest.amount < cat.amount )
            {
                highest.amount = cat.amount 
                highest.title = cat.title
                popularIndex = index
            }
            index++ ; 
        }
        
        return { title : highest.title , amount : highest.amount , index : popularIndex } 
    }
    
    let popularCategory  = getPopularCategory()  
    
    // returns object containing most popular sub category
    let getPopularSubcategory = ( index ) => {
        
        let highest = { amount : 0 } 
        if(categories[ index ])
        for ( let subCat of categories[ index ].subCategory )
        {
            if ( highest.amount < subCat.amount )
            {
                highest.title = subCat.title 
                highest.amount = subCat.amount
            }
            
        }
        
        return {title : highest.title , amount : highest.amount }
    }
    
    let popularSubcategory = getPopularSubcategory( popularCategory.index )
    
    // checks if there is any data in redux
    
    let doesDataExist = () => {
        for ( let data of monthlyExpense )
        if( data != 0 )
        return true

        return false
    }

    let dataExists = doesDataExist()
    

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
                            {loss ? <span className="percent-down-badge"> <VscTriangleDown/> { profitPercentChange}%</span> 
                            : <span className="percent-up-badge"> <VscTriangleUp/> { profitPercentChange}%</span>}
                                <span className='ps-2'>
                                    From previous period
                                </span>
                            </div>
                        </div>
                        <div className="imp-info-card">
                            <span>Most popular category</span>
                                <p>{popularCategory.title ? popularCategory.title : "None"}</p>
                                <div>
                                    <span>
                                        Amount : 
                                    </span>
                                    <span className="percent-green ms-2">
                                        $ {popularCategory.amount}
                                    </span>
                                </div>
                            </div>
                        <div className="imp-info-card">
                            <span>Most popular subcategory</span>
                                <p>{popularSubcategory.title ? popularSubcategory.title : "None"}</p>
                                <div>
                                    <span>
                                        Amount : 
                                    </span>
                                    <span className="percent-green ms-2">
                                        $ {popularSubcategory.amount}
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
                            <div className='text-center'>
                                {dataExists ? <DoughnutChart/> : <div> <p>Analytics</p> <p>No Data Found</p> </div>}
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
