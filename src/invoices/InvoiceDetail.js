import React, { useState, useEffect} from "react";

import { apiGet } from "../utils/api";
import { useParams } from "react-router-dom";

const InvoiceDetail = () => {
    const {id} = useParams();
    const [invoice, setInvoice] = useState({});
    const [sellerName, setSellerName] = useState("");
    const [buyerName, setBuyerName] = useState("");

    useEffect(() => {
        apiGet("/api/invoices/" + id)
        .then((data) => {
            setInvoice(data);
            setSellerName(invoice.seller.name);
            setBuyerName(invoice.buyer.name);
        })
        .catch((error) => {
            console.error(error);
        })
    });


    return (
        <div>
            <h1>Detail faktury</h1>
            <br/>
            <p>
                <strong>Číslo faktury:</strong>
                <br/>
                {invoice.invoiceNumber}
            </p>
            <p>
                <strong>Prodejce:</strong>
                <br/>
                {sellerName}
            </p>
            <p>
                <strong>Kupující:</strong>
                <br/>
                {buyerName}
            </p>
            <p>
                <strong>Vystavena:</strong>
                <br/>
                {invoice.issued}
            </p>
            <p>
                <strong>Datum splatnosti:</strong>
                <br/>
                {invoice.dueDate}
            </p>
            <p>
                <strong>Produkt:</strong>
                <br/>
                {invoice.product}
            </p>
            <p>
                <strong>Cena:</strong>
                <br/>
                {invoice.price}
            </p>
            <p>
                <strong>DPH</strong>
                <br/>
                {invoice.vat}
            </p>
            <p>
                <strong>Poznámka</strong>
                <br/>
                {invoice.note}
            </p>
            
        </div>

    )

}

export default InvoiceDetail;