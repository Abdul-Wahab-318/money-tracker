import React from 'react'
import './CategoryCard.css'



export default function CategoryCard(props) {

    let {category} = props

    return (
        <div className="category-card">
            <div className="category-heading">
                <h4>{category.title}</h4>
                <h4 className="text-green fw-400">{category.amount} PKR</h4>
            </div>
            <div className="sub-categories">
                {category.subCategory.map((el,ind)=> {

                    return <div key={ind} >
                                <p>{el.title} </p>
                                <p className="text-green">{el.amount} PKR </p>
                            </div>    

                }  )}
                    
            </div>
        </div>
    )
}
