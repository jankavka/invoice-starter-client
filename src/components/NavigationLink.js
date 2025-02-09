import React, { useState } from "react"
import { Link, useLocation } from "react-router-dom"

const NavigationLink = () => {
    const [isClickedOnPersons, setIsClickedOnPersons] = useState(true);
    const [isClickedOnInvoices, setIsClickedOnInvoices] = useState(false)
    const location = useLocation();

    const handleClickOnPersons = () => {
        setIsClickedOnInvoices(false);
        setIsClickedOnPersons(true);
    }
    const handleClickOnInvoices = () => {
        setIsClickedOnInvoices(true);
        setIsClickedOnPersons(false);
    }

    return (
        <div>
            <ul className="navbar-nav mr-auto">
                <li className="nav-item ps-1 offset-md-5 offset-1">
                    <Link to={"/persons"} className={`nav-link fs-2 ${isClickedOnPersons ? "clicked-nav" : "text-light"}`} onClick={handleClickOnPersons}>
                        Osoby
                    </Link>
                </li>
                <li className="nav-item offset-1">
                    <Link to={"/invoices"} className={`nav-link fs-2 ${isClickedOnInvoices ? "clicked-nav" : "text-light"}`} onClick={handleClickOnInvoices}>
                        Faktury
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default NavigationLink;