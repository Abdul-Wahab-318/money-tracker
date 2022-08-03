import React , {useState} from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import Logo from '../../images/logo.svg'
import PopupWrapper from '../popupWrapper/PopupWrapper'
import Login from '../login/Login'
import { useSelector } from 'react-redux'
import { useSaveUser } from '../../hooks/useSaveUser'
import { useAlert } from 'react-alert'
import { logout } from '../../api/api'
export default function Header() {

    let alert = useAlert()
    let [user , setUser] = useSaveUser({})
    let [ showPopup , setShowPopup ] = useState(false)
    let userStatus = useSelector( state => state.userReducer._id )
    let [ userLoggedIn , setUserLoggedIn ] = useState( userStatus )

    let handleLogout = async () => {
        console.log("handling logout")
        await logout()
        setUser({type: "LOGOUT"})
        localStorage.removeItem("budget")
        alert.info( "Logged Out" )
    }
    
    React.useEffect(() => {
        setUserLoggedIn(userStatus)
    },[userStatus])

    return (
        <header className = "header-component">
            <nav className="header-inner d-flex justify-content-between align-items-center">
                <div className="header-logo">
                    <Link to="/" className="d-flex"><img src={Logo} width="40px" alt="" /></Link>
                    <Link to="/"><h1>money tracker</h1></Link>
                </div>
                <div className="nav-links">
                    { 
                        userLoggedIn ? 
                        <button className='btn btn-primary' onClick={()=> handleLogout() }>Logout</button>
                        :
                        <>
                            <button className='btn btn-primary' onClick={()=> setShowPopup( state => !state ) }>Login</button>
                            <Link to="/register">Register</Link>
                        </>
                    }
                    <Link to="/analytics">Analytics</Link>
                    
                </div>
                <PopupWrapper component = {Login} show={ showPopup } setShow = { setShowPopup }/>
            </nav>
        </header>
    )
}
