import React from 'react'
import './ExpenseForm.css'
import { useDispatch , useSelector} from 'react-redux';
import {store} from '../../redux/store' 
import { useFormik } from 'formik';
import {useAlert} from 'react-alert'
import { updateBudget } from '../../api/api';
import * as Yup from 'yup';

export default function ExpenseForm() {
    
    const dispatch = useDispatch()
    const alert = useAlert()

    const subCategoryTags = [ ...new Set( useSelector(state => state.budgetReducer.subCategoryTags).map( el => el.subCategory) ) ]  
    const expenseTags = [ ...new Set( useSelector(state => state.budgetReducer.expenseTags) ) ] 

    let date = new Date()
    let currentDate = `${date.getDate().toString()} / ${ ( date.getMonth()+1 ).toString() } / ${date.getFullYear().toString()}`
    //JAVASCRIPT MONTHS START AT 0TH INDEX

    let doesSubCategoryExist = (subCategory)=>{
        return subCategoryTags.some( subCat => subCat === subCategory )
    } 

    const formik = useFormik({
        initialValues: {
          from: '',
          tags: '',
          amount: '',
          note : ''
        },
        validationSchema: Yup.object({

          from: Yup.string()
            .required('Sub Category is required'),

          tags: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Tags are Required'),
          
          amount: Yup.number().moreThan( -1 , "Amount cannot be negative").required('Amount Required'),
          note: Yup.string()
            .max(70, 'Must be 70 characters or less')

        }),
        onSubmit: async  ( values , {resetForm} ) => {

            let budgetState = store.getState().budgetReducer
            const categories = store.getState().budgetReducer.category.length
            if( categories === 0) //IF NO CARTEGORY EXISTS
            {
                alert.error("Category not found")    
                return
            }

            if(!doesSubCategoryExist(values.from)) //IF NO SUCH NAMED SUB CATEGORY EXISTS
            {
                alert.error("Sub Category not found")
                return
            }

            let mainCategoryName = budgetState.subCategoryTags.find( el => el.subCategory === values.from ).mainCategory
            let mainCategory = budgetState.category.find( el => el.title === mainCategoryName )
            let subCategoryAmount = mainCategory.subCategory.find( el => el.title === values.from ).amount

            if( subCategoryAmount < values.amount )
            {
                alert.error("Amount exceeds total")
                return
            }

            dispatch({type : "ADD_EXPENSE" , payload : {...values , from : values.from.trim(), mainCategoryName } })
            budgetState = store.getState().budgetReducer

            await updateBudget( budgetState )
            
            localStorage.setItem("budget" , JSON.stringify(budgetState))
            alert.success("Expense Added")
            resetForm()

        },
      });

    return (
        <div className="expense-form-component">
            <form action="" onSubmit={formik.handleSubmit} autoComplete="off">

            <div className="form-col mb-3">
                <label htmlFor="">From</label>
                <div className="form-col-inner">
                    <input list="to" type="text" placeholder="Select Existing Sub Category"
                    {...formik.getFieldProps('from')} />
                    <datalist id="to">
                        {subCategoryTags.map( (el,i) => <option key={i} value={el}> {el} </option>)}
                    </datalist>
                    <input type="number" placeholder = "Amount" 
                    {...formik.getFieldProps('amount')}/>
                </div>
                <div className="errors">
                    {formik.touched.from && formik.errors.from ? (<div>{formik.errors.from}</div>) : null}
                    {formik.touched.amount && formik.errors.amount ? (<div>{formik.errors.amount}</div>) : null}
                </div>
            </div>

            <div className="form-col mb-3">
                <label htmlFor="">Tags</label>
                <div className="form-col-inner">
                    <input list="tags" type="text" placeholder="Choose existing or add new" 
                    {...formik.getFieldProps('tags')}/>
                    <datalist id="tags" >
                        {expenseTags.map( ( tag , i ) => <option key = {i} value={tag} > {tag} </option>)}
                    </datalist>
                    <input type="text" disabled placeholder = {currentDate} />
                </div>
                <div className="errors">
                    {formik.touched.tags && formik.errors.tags ? (<div>{formik.errors.tags}</div>) : null}
                </div>
            </div>
            <div className="form-col ">
                <label htmlFor="">Note</label>
                <div className="form-col-inner">
                    <input type="text" placeholder="Note" 
                    {...formik.getFieldProps('note')}/>
                    <button type="submit" className="btn btn-primary">Add Expense</button>
                </div>
                <div className="errors">
                    {formik.touched.note && formik.errors.note ? (<div>{formik.errors.note}</div>) : null}
                </div>
            </div>
            </form>
        </div>
    )
}
