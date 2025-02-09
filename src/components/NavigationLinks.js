import React, { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"


/**
 * Made for managing css styles applicated on navigation links
 * @returns component with whole navigation
 */
const NavigationLinks = () => {
    const [isClickedOnPersons, setIsClickedOnPersons] = useState(true);
    const [isClickedOnInvoices, setIsClickedOnInvoices] = useState(false);
    const location = useLocation();

    const handleClickOnPersons = () => {
        setIsClickedOnInvoices(false);
        setIsClickedOnPersons(true);
    }
    const handleClickOnInvoices = () => {
        setIsClickedOnInvoices(true);
        setIsClickedOnPersons(false);
    }

    useEffect(() => {
        if(location.pathname.startsWith("/invoices")){
            setIsClickedOnInvoices(true);
            setIsClickedOnPersons(false);
        }else{
            setIsClickedOnInvoices(false);
            setIsClickedOnPersons(true);
        }
    },[])

    
    return (
      
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-nav mb-3">
            <div className="container-fluid">
                <button className="navbar-toggler mb-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item ps-md-2 offset-md-4 ">
                    <Link 
                        to={"/persons"} 
                        className={`nav-link fs-2 ${isClickedOnPersons ? "clicked-nav" : "text-light"}`} 
                        onClick={handleClickOnPersons}
                    >
                        Osoby
                    </Link>
                    </li>
                    <li className="nav-item ps-md-1 offset-md-1">
                    <Link 
                        to={"/invoices"} 
                        className={`nav-link fs-2 ${isClickedOnInvoices ? "clicked-nav" : "text-light"}`} 
                        onClick={handleClickOnInvoices}
                    >
                        Faktury
                    </Link>
                    </li>
                </ul>
                </div>
            </div>
            </nav>
        </div>
      );
}

export default NavigationLinks;