import React , { useState , useEffect }  from 'react'
import "./PopupWrapper.css"
export default function PopupWrapper( props ) {

    let Component = props.component

  return (
    <div className='popup-component'>
        {
            props.show ? 
            <div className='popup-parent'>
                <div className="popup-bg" onClick={()=> props.setShow(false)}></div>
                <div className='popup-inner'>
                    <Component show = {props.show} setShow ={props.setShow}/>
                </div> 
            </div>
            : <div className='hide-popup d-none '></div>
        }
    </div>

  )
}
