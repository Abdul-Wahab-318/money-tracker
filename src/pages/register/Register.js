import React , { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import "./Register.css"
import URL from '../../api'
import {store} from "../../redux/store"
import { useAlert } from 'react-alert'
import { useHistory } from 'react-router-dom'
import { useSaveUser } from '../../hooks/useSaveUser'


export default function Register() {

    let history = useHistory()
    let alert = useAlert()
    let [ loading , setLoading ] = useState(false)
    let [userInfo , setUserInfo ] = useSaveUser({})
    let formik = useFormik(
        
        {
        initialValues : {
            firstName : '' , 
            lastName : '' , 
            password : '' , 
            reEnterPassword : '' , 
            email : '' ,
            DOB : new Date( 2003 , 4 , 4 )
        },

        validationSchema: Yup.object({
            firstName : Yup.string().max( 40 , " first name must be 40 characters or less ")
            .min(2 , "Must be atleast 2 characters ").required('First name is required') ,

            lastName : Yup.string().max( 40 , " first name must be 40 characters or less ")
            .min(2 , "Must be atleast 2 characters ").required('last name is required') ,

            password : Yup.string().max( 40 , " password must be 40 characters or less ")
            .min(6 , "Must be atleast 6 characters ")
            .matches( /^(?=\D*\d)\S{6,}$/ , "Password must contain atleast 6 characters and 1 digit")
            .required('password is required') ,

            reEnterPassword : Yup.string().oneOf([Yup.ref("password") , null] , "Passwords must match").required("Re enter the password") ,

            email : Yup.string().email("Invalid email address").required(" email is required ") , 

            DOB : Yup.date().required("date of birth is required")
        }) , 

        onSubmit : async (values , { resetForm }) => {

            let user = {...values , budget : populateBudget() }
            delete user.reEnterPassword

            try{
                setLoading(true)
                let newUser = await fetch( `${URL}/user/register` , 
                    {   method : "POST" , 
                        headers : { "Content-type" : "application/json"} , 
                        credentials : "include" , 
                        body : JSON.stringify(user)
                    })
                    .then( data => data.json())
                    .then( response => {
    
                        if ( !response.ok )
                        throw { code : response.code , message : response.message }
                        else
                        {
                            setUserInfo({ type : "SAVE_USER_INFO" , payload : response.user })
                            resetForm()
                            alert.success("Account created")
                            let budget = store.getState().budgetReducer
                            localStorage.setItem("budget" , JSON.stringify(budget) )
                            history.push("/")
                        }
                    })

            }
            catch( err )
            {
                if ( err.code == 11000)
                formik.errors.email = "email already in use"
                else 
                {
                    alert.error(err.message)
                    console.log(err)
                }
            }
            setLoading(false)
        }
        }

    )

    let populateBudget = () => {

        return store.getState().budgetReducer

    }

    return (
        <section className="register-form p-5">
            <div className="register-form-inner custom-container">
                <form onSubmit={formik.handleSubmit}>
                    <div className="row mx-0 my-3">
                        <div className="form-heading d-flex align-items-center">
                            <i className="bi bi-person-circle fs-2 me-3 " ></i>
                            <h2 className='mb-0'>Register an Account</h2>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                id="firstName"
                                type="text"
                                {...formik.getFieldProps('firstName')}
                            />
                            {formik.touched.firstName && formik.errors.firstName ? (
                                <div className='errors'>{formik.errors.firstName}</div>
                            ) : null}
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="lastName">Last Name</label>
                            <input id="lastName" type="text" {...formik.getFieldProps('lastName')} />
                            {formik.touched.lastName && formik.errors.lastName ? (
                                <div  className='errors'>{formik.errors.lastName}</div>
                            ) : null}

                        </div>
                        <div className="col-md-4">
                            <label htmlFor="email">Email Address</label>
                            <input id="email" type="email" {...formik.getFieldProps('email')} />
                            {formik.touched.email && formik.errors.email ? (
                                <div className='errors'>{formik.errors.email}</div>
                            ) : null}
                        </div>
                    </div>

                    <div className="row mx-0 my-3">
                        <div className="col-md-4">
                            <label htmlFor="password">Password</label>
                            <input id="password" type="password" {...formik.getFieldProps('password')} />
                            {formik.touched.password && formik.errors.password ? (
                                <div className='errors'>{formik.errors.password}</div>
                            ) : null} 
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="reEnterPassword">Re Enter Password</label>
                            <input id="reEnterPassword" type="reEnterPassword" {...formik.getFieldProps('reEnterPassword')} />
                            {formik.touched.reEnterPassword && formik.errors.reEnterPassword ? (
                                <div className='errors'>{formik.errors.reEnterPassword}</div>
                            ) : null}   
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="DOB">Date of birth</label>
                            <input id="DOB" type="date" {...formik.getFieldProps('DOB')} />
                            {formik.touched.DOB && formik.errors.DOB ? (
                                <div className='errors'>{formik.errors.DOB}</div>
                            ) : null}  
                        </div>
                    </div>
                <button type="submit" className='btn btn-primary' disabled={loading}>Submit</button>
                </form>
            </div>
        </section>
      )
}
