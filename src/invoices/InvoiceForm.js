import React, { useEffect, useState } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";

import {apiGet, apiPost, apiPut} from "../utils/api";

import InputField from "../components/InputField";
import FlashMessage from "../components/FlashMessage";
import InputSelect from "../components/InputSelect";

const InvoiceForm = () => {
    const navigate = useNavigate;
    const {id} = useParams();
    const [invoice, setInvoice] = useState({
        invoiceNumber:"",
        seller:{
            _id:""
        },
        buyer:{
            _id:""
        },
        issued:"",
        dueDate:"",
        product:"",
        price:"",
        vat:"",
        note:""
    });
    const [personList, setPersonList] = useState([]);
    const [sentState, setSent] = useState(false);
    const [successState, setSuccess] = useState(false);
    const [errorState, setError] = useState(null);

    useEffect(() => {
        apiGet("/api/persons").then((data) => setPersonList(data));
        if(id){
        apiGet("/api/invoices/" + id).then((data) => setInvoice(data));
        }
    },[id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!id){
        apiPost("/api/invoices", invoice).then((data) => {
            setSent(true);
            setSuccess(true);
            navigate("/invoices");
        
        });
        }else{
        apiPut("/api/invoices/" + id, invoice).then(() => {
            setSent(true);
            setSuccess(true);
            navigate("/invoices");
        })
    }

};

    const sent = sentState;
    const success = successState;


    return(
        <div>
            <h1>Vyrtvořit fakturu</h1>
            <hr/>
            {errorState ? (
                <div className="alert alert-danger">{errorState}</div>)
            : null}
            {sent && (
                <FlashMessage
                    theme={success ? "success" : ""}
                    text={success ? "Uložení faktury proběhlo úspěšně." : ""}
                />
            )}
            <form onSubmit={handleSubmit}>
                <InputField
                    required = {true}
                    type = "number"
                    name = "invoiceNumber"
                    min = "3"
                    label = "Číslo faktury"
                    prompt = "Zadejte číslo faktury"
                    value = {invoice.invoiceNumber}
                    handleChange = {(e) => {
                        setInvoice({...invoice, invoiceNumber: e.target.value});
                    }}
                />
                <InputSelect
                    required = {true}
                    //multiple = {true}
                    name = "seller"
                    items = {personList}
                    label = "Prodejce"
                    prompt = "Vyberte prodejce"
                    value = {invoice.seller}
                    handleChange = {(e) => {
                        setInvoice({...invoice, seller: {_id :e.target.value}})
                    }}
                />
                <InputSelect
                    required = {true}
                    //multiple = {true}
                    name = "buyer"
                    items = {personList}
                    label = "Kupující"
                    prompt = "Vyberte kupujícího"
                    value = {invoice.buyer}
                    handleChange = {(e) => {
                        setInvoice({...invoice, buyer:{_id: e.target.value}})
                    }}
                />
                <InputField
                    required = {true}
                    type = "date"
                    name = "issued"
                    label = "Vystaveno"
                    prompt = "Doplňte datum vystavení"
                    value = {invoice.issued}
                    handleChange = {(e) => {
                        setInvoice({...invoice, issued: e.target.value})
                    }}
                />
                <InputField
                    required = {true}
                    type = "date"
                    name = "dueDate"
                    label = "Datum splatnosti"
                    prompt = "Doplňte datum splatnosti"
                    value = {invoice.dueDate}
                    handleChange = {(e) => {
                        setInvoice({...invoice, dueDate: e.target.value})
                    }}
                />
                <InputField
                    required = {true}
                    type = "text"
                    name = "product"
                    min = "3"
                    label = "Název Produktu"
                    prompt = "Vyplňte název produktu"
                    value = {invoice.product}
                    handleChange = {(e) => {
                        setInvoice({...invoice, product: e.target.value})
                    }}
                />
                <InputField
                    required = {true}
                    type = "number"
                    name = "price"
                    label = "Cena (Kč)"
                    prompt = "Vyplňte název produktu"
                    value = {invoice.price}
                    handleChange = {(e) => {
                        setInvoice({...invoice, price: e.target.value})
                    }}
                />
                <InputField
                    required = {true}
                    type = "number"
                    name = "vat"
                    label = "DPH"
                    prompt = "DPH"
                    value = {invoice.vat}
                    handleChange = {(e) => {
                        setInvoice({...invoice, vat: e.target.value})
                    }}
                />
                <InputField
                    required = {true}
                    type = "text"
                    name = "note"
                    label = "Poznámka"
                    prompt = "Poznámka"
                    value = {invoice.note}
                    handleChange = {(e) => {
                        setInvoice({...invoice, note: e.target.value})
                    }}
                />
                <div className="row mt-3">
                    <div className="col-1">
                        <button type="sumbit" className="btn btn-primary ">Uložit</button>
                    </div>
                    <div className="col-1">
                        <Link to={"/invoices"} className="btn btn-success">
                            Zpět
                        </Link>
                    </div>
                </div>
            </form>
            
        </div>
    );
    
};


export default InvoiceForm;