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
    const [deleteSuccessState, setDeleteSuccessState] = useState({});
    const createSuccessState = {successState: false};
    const newInvoiceState = {newInvoice: false};
    const {deleteSuccess} = location.state || deleteSuccessState;
    const {successState} = location.state || createSuccessState;
    const {newInvoice} = location.state || newInvoiceState;
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
        setDeleteSuccessState({deleteSuccess:true});
        //console.log(deleteSuccess);
        setTimeout(() => {setDeleteSuccessState(false)}, 7500);
    };


    useEffect(() => {
        apiGet("/api/invoices").then((data) => setInvoices(data));
        apiGet("/api/persons").then((data) => setPersonsState(data));
        //apiGet("/api/invoices/" + invoices._id + "/pdf").then((data) => setInvoices(prevState => {return {...prevState, invoicePdf: data}}));
        
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
        // to not show FlashMessage while starting filtering
        setDeleteSuccessState({deleteSuccess:false});
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
            {newInvoice ? 
            <div>
                <FlashMessage
                    theme="success"
                    text="Vytvoření nové faktury proběhlo úspěšně"
                    items={invoices}
                />
            </div>:
            successState ?
            <FlashMessage
                theme="success"
                text="Aktualizace faktury proběhla úspěšně"
                items={invoices}
            /> : null}
            {deleteSuccess ?
                <div>
                    <FlashMessage
                        theme="success"
                        text="Vymazání faktury probehlo úspěšně"
                        items={invoices}
                    />
                </div>
                : null}
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