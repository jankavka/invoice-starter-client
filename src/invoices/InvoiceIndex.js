import React from "react";
import { useEffect, useState } from "react";
import { apiDelete, apiGet } from "../utils/api";
import InvoiceTable from "./InvoiceTable";
import InvoiceStatistics from "./InvoiceStatistics";
import InvoiceFilter from "./InvoiceFilter";
import { useLocation } from "react-router-dom";
import FlashMessage from "../components/FlashMessage";

const InvoiceIndex = () => {
    const [invoices, setInvoices] = useState([]);
    const [personsState, setPersonsState] = useState([]);
    const location = useLocation();
    const {successState} = location.state || {};
    const [filterState, setFilterState] = useState({
        buyerId: undefined,
        sellerId:undefined,
        product: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        limit: undefined,
    });

    const deleteInvoice = async (id) =>  {
        try{
           await apiDelete("/api/invoices/" + id);
        }catch(error){
            console.log(error.message);
            alert(error.message);
        }
        setInvoices(invoices.filter((item) => item._id !== id)); 
    };


    useEffect(() => {
        apiGet("/api/invoices").then((data) => setInvoices(data));
        apiGet("/api/persons").then((data) => setPersonsState(data));
    }, [])

    const handleChange = (e) => {
        if (e.target.value === "false" || e.target.value === "true" || e.target.value === ""){
            setFilterState(prevState => {
                return{...prevState, [e.target.name]: undefined}
            });
        }else{
            setFilterState((prevState) => {
                return{...prevState, [e.target.name]:e.target.value}
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const params = filterState;
        apiGet("/api/invoices", params).then((data) => setInvoices(data));
    };


    const handleReset = () => {
        setFilterState({
            buyerId: undefined,
            sellerId:undefined,
            product: undefined,
            minPrice: undefined,
            maxPrice: undefined,
            limit: undefined,
        })
    }

    return(
        <div>
            <h1>Seznam faktur</h1>
            {successState ?
            <FlashMessage
                theme="success"
                text="Aktualizace faktury proběhla úspěšně"
            /> : null}
            <InvoiceFilter
                filter={filterState}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleReset={handleReset}
                persons={personsState}
                confirm="Vyhledej"

            />
            <InvoiceTable
                items = {invoices}
                deleteInvoice={deleteInvoice}
                label="Počet faktur: "
            />
            <InvoiceStatistics/>
        </div>
    );
}

export default InvoiceIndex;