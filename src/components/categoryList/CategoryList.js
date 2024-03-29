import React from 'react'
import './CategoryList.css'
import { useSelector } from 'react-redux'
import CategoryCard from '../categoryCard/CategoryCard'

export default function CategoryList() {

    let allCategories  = useSelector(state=> state.budgetReducer.category)
    let netAmount = allCategories.reduce( (accum , val) => accum + val.amount , 0 )

    return (
        <main className="category-list-component">
            <div className="net-amount lead-text">
                <h4>Net Amount :</h4>
                <h4 className="text-green">{netAmount} PKR </h4>
            </div>
            <div className="categories-list">
                { 
                allCategories.length == 0 ? 

                <div className="empty-list ">Add an Income</div> : allCategories.map( (el,ind) => <CategoryCard  key={ind} category={el} /> )}

            </div>
        </main>
    )
}
