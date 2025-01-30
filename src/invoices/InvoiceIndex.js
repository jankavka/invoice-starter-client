import React from "react";
import { useEffect, useState } from "react";
import { apiDelete, apiGet } from "../utils/api";
import InvoiceTable from "./InvoiceTable";
import InvoiceStatistics from "./InvoiceStatistics";

const InvoiceIndex = () => {
    const [invoices, setInvoices] = useState([]);

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
    }, [])

    return(
        <div>
            <h1>Seznam faktur</h1>
            <InvoiceTable
                items = {invoices}
                deleteInvoice={deleteInvoice}
                label="Počet faktur: "
            />
            <InvoiceStatistics/>
        </div>
    )
}

export default InvoiceIndex;