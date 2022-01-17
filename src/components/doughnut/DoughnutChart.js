import React from 'react'
import './DoughnutChart.css'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import {store } from '../../redux/store'


export default function DoughnutChart() {
    
    let subCatAmount = store.getState().category.map( subCat => {
        return subCat.subCategory.map( el => el.amount)
    }) ;

    let subCatTitle = store.getState().category.map( subCat => {
        return subCat.subCategory.map( el => el.title)
    }) ;

    let randomBg = () => {
        return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 132, 0.3)` // generate random number between 0 and 255
    }

    ChartJS.register(ArcElement, Tooltip, Legend)
    let randomBgColors = subCatTitle.flat().map( el => randomBg()  )
    const data = {
        labels: [...subCatTitle.flat()],
        datasets: [
            {
                label: '# of Votes',
                data: [...subCatAmount.flat()],
                backgroundColor: [
                    ...randomBgColors  
                ],
                borderColor: [
                    ...randomBgColors
                ],
                borderWidth: 1,
            },
        ],
    }
    
    
    return (
        <div className='doughnut-component pb-2' >
            <div className="text-center">
                <p className='pb-1s'>Analytics</p>
                <Doughnut data={data} />

            </div>
        </div>
    )
}
