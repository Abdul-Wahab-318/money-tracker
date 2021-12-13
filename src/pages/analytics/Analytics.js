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

    let monthlyIncome = store.getState().monthlyIncome ;
    console.log(monthlyIncome)

    const data = {
    labels,
    datasets: [
        {
        label : "Monthly Income",  
        data : [...monthlyIncome] , 
        backgroundColor: 'rgba(33, 186, 69, 0.5)',
        } ,

        {
        label : "Monthly Expenses",  
        data : [122 , 434 , 900 , 670 , 1 , 100 , 1000 , 400 , 800] , 
        backgroundColor: 'rgba(255, 0, 0, 0.6)',
        }
    ],
    };
    



    return (
        <div className="analytics-component">
            <h1>UNDER DEVELOPMENT ... </h1>
            <h3>Dangerous !</h3>
            <button className="btn btn-danger m-5" onClick={()=> resetBudget()}> Reset Jojo Part 6 style </button>
        
            <section className="analytics-chart monthly container">
                <Bar  data={data} />
            </section>


        </div>
    )
}
