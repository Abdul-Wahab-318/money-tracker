import React from 'react'
import './Transfer.css'
import { useDispatch , useSelector} from 'react-redux';
import {store} from '../../redux/store' 
import { useFormik } from 'formik';
import {useAlert} from 'react-alert'
import { updateBudget } from '../../api/api';
import * as Yup from 'yup';

export default function Transfer() {

    const alert = useAlert()
    const dispatch = useDispatch()

    const categoryTags = useSelector(state => state.categoryTags)
    const subCategoryTags = [ ...new Set( useSelector(state => state.budgetReducer.subCategoryTags).map( el => el.subCategory) ) ]  
    const incomeTags =   [ ...new Set(useSelector(state => state.budgetReducer.incomeTags)) ]  

    let date = new Date()
    let currentDate = `${date.getDate().toString()} / ${ ( date.getMonth()+1 ).toString() } / ${date.getFullYear().toString()}`
    //JAVASCRIPT MONTHS START AT 0TH INDEX

    let doesSubCatExist = ( title ) => {
        return subCategoryTags.some( subCat => subCat === title )
    }
    //console.log("Does it contain ? " , doesStringExist("primary" , subCategoryTags))
    const formik = useFormik({
        initialValues: {
          to: '',
          from: '',
          tags: '',
          amount: '',
          note : ''
        },
        validationSchema: Yup.object({

          to: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .min(3, "Must be 3 characters or more")
            .required('Category is required'),

          from: Yup.string()
          .max(20, 'Must be 20 characters or less')
          .min(3, "Must be 3 characters or more")
          .required('Category is required'),

          tags: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Tags are Required'),

          
          amount: Yup.number().positive("Amount must be positive").required('Amount Required'),

          note: Yup.string()
            .max(70, 'Must be 70 characters or less')

        }),
        onSubmit: async ( values , {resetForm} ) => {

            if( values.from === values.to )
            {
                alert.error("cannot transfer to the same category") 
                return
            }
            
            if( !(doesSubCatExist( values.from ) && doesSubCatExist( values.to )) )
            {
                alert.error("Category not found")
                return 
            }

            try{

                dispatch({type : 'TRANSFER' , payload : {...values , to: values.to.trim() , from : values.from.trim()}})   
                let budget = store.getState().budgetReducer
                await updateBudget( budget )

                alert.success("Transferred")
                localStorage.setItem("budget" , JSON.stringify(budget) )

                resetForm()
            }
            catch( err )
            {
                alert.error(err)
            }

        },
      });


    return (
        <main className="transfer-component">
                        <form action="" onSubmit={formik.handleSubmit} autoComplete="off">

                            <div className="form-col mb-3">
                                <label htmlFor="">From</label>
                                <div className="form-col-inner">
                    
                                    <input list="from" type="text" placeholder="Select a sub category"
                                    {...formik.getFieldProps('from')} />
                                    <datalist id="from">
                                        {subCategoryTags.map((el,ind)=> <option key={ind} >{el}</option>)}
                                    </datalist>
                                    

                                    <input type="number" placeholder = "Amount" 
                                    {...formik.getFieldProps('amount')}/>

                                    <div>
                                        <label htmlFor="">To</label>
                                        <input list="to" type="text" placeholder="Select a sub category" className="w-100" {...formik.getFieldProps('to')}/>
                                    </div>

                                    <datalist id="to">
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
                                    <button type="submit" className="btn btn-primary" >Transfer</button>
                                </div>
                                <div className="errors">
                                    {formik.touched.note && formik.errors.note ? (<div>{formik.errors.note}</div>) : null}
                                </div>
                            </div>

                        </form>
        </main>
    )
}
