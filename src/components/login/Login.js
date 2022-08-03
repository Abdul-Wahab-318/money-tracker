import React , { useState } from 'react'
import "./Login.css"
import { useFormik } from 'formik'
import * as Yup from 'yup'
import URL from '../../api'
import { store } from '../../redux/store'
import { useAlert } from 'react-alert'
import { useHistory } from 'react-router-dom'
import { useSaveUser } from '../../hooks/useSaveUser'


export default function Login({ show , setShow }) {

    let history = useHistory()
    let alert = useAlert()
    let [userInfo , setUserInfo ] = useSaveUser({})
    let [ loading , setLoading ] = useState(false)
    let populateBudget = () => {

        return store.getState().budgetReducer

    }
    let formik = useFormik(
        
        {
        initialValues : {
            password : '' , 
            email : '' ,
        },

        validationSchema: Yup.object({
            password : Yup.string().max( 40 , " password must be 40 characters or less ")
            .min(6 , "Must be atleast 6 characters ")
            .matches( /^(?=\D*\d)\S{6,}$/ , "Password must contain atleast 6 characters and 1 digit")
            .required('password is required') ,

            email : Yup.string().email("Invalid email address").required(" email is required ") , 
        }) , 

        onSubmit : async (values , { resetForm }) => {

            try{
                setLoading(true)
                let newUser = await fetch( `${URL}/user/login` , 
                    {   method : "POST" , 
                        headers : { "Content-type" : "application/json"} , 
                        credentials : "include" , 
                        body : JSON.stringify(values)
                    })
                    .then( data => data.json())
                    .then( response => {
    
                        if ( !response.ok )
                        throw { code : response.code , message : response.message }
                        else
                        {
                            setUserInfo({ type : "SAVE_USER_INFO" , payload : response.user })
                            resetForm()
                            alert.success("Logged In")
                            let budget = store.getState().budgetReducer
                            localStorage.setItem("budget" , JSON.stringify(budget) )
                            setShow(false)
                        }
                    })
                    
                }
                catch( err )
                {
                    alert.error(err.message)
                    console.log(err)
                }
                setLoading(false)
        }
        }

    )

  return (
        <section className="login-form p-5">
        <div className="register-form-inner login-form-inner">
            <form onSubmit={formik.handleSubmit}>
                <div className="row mx-0 my-3 justify-content-center">
                    <div className="form-heading d-flex align-items-center">
                        <i className="bi bi-person-circle fs-2 me-3 " ></i>
                        <h2 className='mb-0'>Login</h2>
                    </div>
                    <div className="col-lg-12">
                        <label htmlFor="firstName">Email</label>
                        <input
                            id="email"
                            type="text"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className='errors'>{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <div className="col-lg-12 mt-3">
                        <label htmlFor="lastName">Password</label>
                        <input id="lastName" type="password" {...formik.getFieldProps('password')} />
                        {formik.touched.password && formik.errors.password ? (
                            <div  className='errors'>{formik.errors.password}</div>
                        ) : null}

                    </div>
                    <div className="col-lg-4 d-flex justify-content-center">
                        <button type="submit" className='btn btn-primary px-4 mx-0 mt-4 ' disabled={loading}>Submit</button>
                    </div>
                </div>
            </form>
        </div>
    </section>
  )
}
