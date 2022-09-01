import React , {useState} from 'react'
import "./RemoveSubCategoryTags.css"
import { useSelector , useDispatch } from 'react-redux'
import deleteIcon from "../../images/delete.png"
import { store } from '../../redux/store';

export default function RemoveSubCategoryTags() {

  let dispatch = useDispatch() ;
  let [subCategoryTags , setSubCategoryTags] = useState( useSelector( state => state.budgetReducer.subCategoryTags ) )

  let handleDelete = ( subCategory ) => {

    let newSubCategoryTags = subCategoryTags.filter( el => el.subCategory !== subCategory)
    setSubCategoryTags( newSubCategoryTags )
    dispatch( { type : "DELETE_SUBCATEGORY_TAGS" , payload : newSubCategoryTags })
    let state = store.getState().budgetReducer
    localStorage.setItem("budget" , JSON.stringify(state))
  }

  return (
        <section className="remove-tags-component">
        <div>
            <div className="remove-tags-inner">
                <h6 className='mb-4'>Remove Sub Category Tags</h6>
                <div className="expense-tag-field-parent">
                    { subCategoryTags.length !== 0 ? subCategoryTags.map( (el, ind) => 
                    <div className='expense-tag-field d-flex align-items-center' key={ind}> 
                        <input type="text" value={el.subCategory} id={ind} 
                         />
                        <div className=" ms-4 icons" >
                            <button className='p-2 ms-2 btn ' onClick={ () => handleDelete(el.subCategory)} ><img src={deleteIcon} width={25} alt="" /></button>
                        </div>
                    </div> ) 
                    :
                    <p className='text-center'>No tags found</p>    
                }

                </div>
            </div>
        </div>
    </section>
  )
}
