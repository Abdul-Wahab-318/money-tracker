import React from 'react'
import './ExpenseForm.css'
import { useDispatch , useSelector} from 'react-redux';
import {store} from '../../redux/store' 
import { useFormik } from 'formik';
import {useAlert} from 'react-alert'
import * as Yup from 'yup';

export default function ExpenseForm() {
    
    const dispatch = useDispatch()
    const alert = useAlert()
    
    const categoryTags =   [ ...new Set(useSelector(state => state.categoryTags)) ]  //REMOVE REPEATED TAGS-
    const subCategoryTags = useSelector(state=> state.category.map((el,ind) =>  el.subCategory.map(el=> el.title) ))

    let date = new Date()
    let currentDate = `${date.getDate().toString()} / ${ ( date.getMonth()+1 ).toString() } / ${date.getFullYear().toString()}`
    //JAVASCRIPT MONTHS START AT 0TH INDEX

    const formik = useFormik({
        initialValues: {
          to: '',
          subCategory : '',
          tags: '',
          amount: '',
          note : ''
        },
        validationSchema: Yup.object({

          to: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .min(3, "Must be 3 characters or less")
            .required('Category is required'),

          tags: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Tags are Required'),
          
          amount: Yup.number().positive("Amount must be positive").required('Amount Required'),
          note: Yup.string()
            .max(30, 'Must be 30 characters or less')

        }),
        onSubmit: values => {
            if(values.subCategory === '') delete values.subCategory

            const state = store.getState().category.length
            if(state === 0)
            {
                
            }


            dispatch({type : 'ADD_INCOME' , payload: values})
            console.log(values);
        },
      });

    return (
        <div className="income-form-component">
            <form action="" onSubmit={formik.handleSubmit}>

            <div className="form-col mb-3">
                <label htmlFor="">From</label>
                <div className="form-col-inner">
                    <input list="to" type="text" placeholder="Select or add new category"
                    {...formik.getFieldProps('to')} />
                    <datalist id="to">
                        {categoryTags.map( (el,ind) => <option key={ind} >{el}</option> )}
                    </datalist>
                    <input type="number" placeholder = "Amount" 
                    {...formik.getFieldProps('amount')}/>
                </div>
                <div className="errors">
                    {formik.touched.to && formik.errors.to ? (<div>{formik.errors.to}</div>) : null}
                    {formik.touched.amount && formik.errors.amount ? (<div>{formik.errors.amount}</div>) : null}
                </div>
            </div>

            <div className="form-col mb-3">
                <label htmlFor="">Tags</label>
                <div className="form-col-inner">
                    <input list="tags" type="text" placeholder="Choose existing or add new" 
                    {...formik.getFieldProps('tags')}/>
                    <datalist id="tags" >
              
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
