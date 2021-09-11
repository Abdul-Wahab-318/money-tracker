import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import Logo from '../../images/logo.svg'

export default function Header() {
    return (
        <header className = "header-component">
            <nav className="header-inner d-flex justify-content-between align-items-center">
                <div className="header-logo">
                    <Link to="/" className="d-flex"><img src={Logo} width="40px" alt="" /></Link>
                    <Link to="/"><h1>money tracker</h1></Link>
                </div>
                <div className="nav-links">
                    <Link to="/analytics">Analytics</Link>
                </div>
            </nav>
        </header>
    )
}
