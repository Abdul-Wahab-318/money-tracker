import React , {useState} from 'react'
import './CategoryCard.css'
import SubCategoryCard from '../subCategoryCard/SubCategoryCard'

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

                    return <SubCategoryCard el = {el} key = {ind} category = { category.title } />    

                }  )}
                    
            </div>
        </div>
    )
}
