import React, { useState } from 'react'
import './IncomeForm.css'
import { useDispatch , useSelector} from 'react-redux';
import {store} from '../../redux/store' 
import { useFormik } from 'formik';
import {useAlert} from 'react-alert'
import * as Yup from 'yup';

export default function IncomeForm() {

    const alert = useAlert()
    const dispatch = useDispatch()

    const categoryTags = useSelector(state => state.categoryTags)
    const subCategoryTags = useSelector(state => state.subCategoryTags)
    console.log( `subCategory tags : ${subCategoryTags}`)
    const incomeTags =   [ ...new Set(useSelector(state => state.incomeTags)) ]  

    let date = new Date()
    let currentDate = `${date.getDate().toString()} / ${ ( date.getMonth()+1 ).toString() } / ${date.getFullYear().toString()}`
    //JAVASCRIPT MONTHS START AT 0TH INDEX

    let isSameSubCategoryName = (subCategoryTags , mainCategory , subCategory ) => {  //ENSURES EACH SUB CATEGORY IS UNIQUE
        return subCategoryTags.some( el => el.subCategory == subCategory && el.mainCategory !== mainCategory )
    } 

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

          subCategory: Yup.string()
          .max(20, 'Must be 20 characters or less')
          .required("Sub Category is required"),
          
          amount: Yup.number().positive("Amount must be positive").required('Amount Required'),
          note: Yup.string()
            .max(30, 'Must be 30 characters or less')

        }),
        onSubmit: ( values , {resetForm} ) => {

            let state = store.getState()
            
            if(state.category.length === 0)
            {
                dispatch({type : 'ADD_FIRST_INCOME' , payload: {...values , to : values.to.trim() , subCategory : values.subCategory.trim() } })
                state = store.getState()
                localStorage.setItem("budget" , JSON.stringify(state) )
                alert.success("Income Added")
                resetForm()
                return 
            }

            if( values.subCategory == values.to )
            {
                alert.error("Main category and subcategory name cannot be same")
                return 
            }

            if(isSameSubCategoryName(state.subCategoryTags , values.to , values.subCategory))
            {
                console.log("CATEGORY NAME DIFFERENT BUT SUB CAT SAME ")
                alert.error("Sub category must be unique")
                return
            }
            
            dispatch({type : 'ADD_INCOME' , payload: {...values , to : values.to.trim() , subCategory : values.subCategory.trim() } })
            state = store.getState()
            localStorage.setItem("budget" , JSON.stringify(state) )
            alert.success("Income Added")
            resetForm()
        },
      });

    return (
        <div className="income-form-component">
            <form action="" onSubmit={formik.handleSubmit} autoComplete="off">

            <div className="form-col mb-3">
                <label htmlFor="">To</label>
                <div className="form-col-inner">
                    <input list="to" type="text" placeholder="Select or add new category"
                    {...formik.getFieldProps('to')} />
                    <datalist id="to">
                        {categoryTags.map( (el,ind) => <option key={ind} >{el}</option> )}
                    </datalist>
                    <input type="number" placeholder = "Amount" 
                    {...formik.getFieldProps('amount')}/>
                    <input list="subCategory" type="text" placeholder="Add a sub category ?" className="w-100" {...formik.getFieldProps('subCategory')}/>
                    <datalist id="subCategory">
                       {subCategoryTags.map((el,ind)=> <option key={ind} >{el}</option>)}
                    </datalist>
                </div>
                <div className="errors">
                    {formik.touched.to && formik.errors.to ? (<div>{formik.errors.to}</div>) : null}
                    {formik.touched.subCategory && formik.errors.subCategory ? (<div>{formik.errors.subCategory}</div>) : null}
                    {formik.touched.amount && formik.errors.amount ? (<div>{formik.errors.amount}</div>) : null}
                </div>
            </div>

            <div className="form-col mb-3">
                <label htmlFor="">Tags</label>
                <div className="form-col-inner">
                    <input list="tags" type="text" placeholder="Choose existing or add new" 
                    {...formik.getFieldProps('tags')}/>
                    <datalist id="tags" >
                        {incomeTags.map((el,ind)=> <option key={ind}>{el}</option>)}
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
                    <button type="submit" className="btn btn-primary" >Add Income</button>
                </div>
                <div className="errors">
                    {formik.touched.note && formik.errors.note ? (<div>{formik.errors.note}</div>) : null}
                </div>
            </div>
            </form>
        </div>
    )
}
