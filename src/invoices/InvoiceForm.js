import React, { useEffect, useState } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";

import {apiGet, apiPost, apiPut} from "../utils/api";

import InputField from "../components/InputField";
import InputSelect from "../components/InputSelect";
import dateStringFormatter from "../utils/dateStringFormatter";

const InvoiceForm = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [personList, setPersonList] = useState([]);
    const [errorState, setError] = useState();
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
        vat:"21",
        note:""
    });

    

    useEffect(() => {
        apiGet("/api/persons").then((data) => setPersonList(data));
        
        if(id){
            apiGet("/api/invoices/" + id).then((data) => setInvoice(data));
        }
    },[]);

    const handleSubmit = (e) => {
        e.preventDefault();

        (id ?  
            apiPut("/api/invoices/" + id, invoice).then(() => {
                navigate("/invoices", {state: {successState:true}});
            }):
            apiPost("/api/invoices", invoice).then(() => {
                navigate("/invoices", {state: {successState:true, newInvoice: true}});
                console.log(invoice.seller._id, invoice.buyer._id)
            
            }))
            .catch((error) => {
                console.log("tato chyba:" + error.message)
                setError(error.message);
            })

    };


    return(
        <div className="text-light">
            <h1>{id ? "Upravit":"Vytvořit"} fakturu</h1>
            <hr/>
            {errorState ? (
                <div className="alert alert-danger">
                    <span>{errorState} <br></br> Je nutné vyplnit všechna pole</span>
                </div>)
            : null}
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col-md-4">
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
                    </div>
                    <div className="col-md-4">
                        <InputSelect
                            //required = {true}
                            name = "seller"
                            items = {personList}
                            label = "Prodejce"
                            prompt = "Vyberte prodejce"
                            value = {invoice.seller._id}
                            handleChange = {(e) => {
                                setInvoice({...invoice, seller: {_id: e.target.value}})
                            }}
                        />
                    </div>
                    <div className="col-md-4">
                        <InputSelect
                            //required = {true}
                            name = "buyer"
                            items = {personList}
                            label = "Kupující"
                            prompt = "Vyberte kupujícího"
                            value = {invoice.buyer._id}
                            handleChange = {(e) => {
                                setInvoice({...invoice, buyer:{_id: e.target.value}})
                            }}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-4">
                        <InputField
                            required = {true}
                            type = "date"
                            name = "issued"
                            label = "Vystaveno"
                            prompt = "Doplňte datum vystavení"
                            value = {dateStringFormatter(invoice.issued)}
                            handleChange = {(e) => {
                                setInvoice({...invoice, issued: e.target.value})
                            }}
                        />
                    </div>
                    <div className="col-md-4">
                        <InputField
                            required = {true}
                            type = "date"
                            name = "dueDate"
                            label = "Datum splatnosti"
                            prompt = "Doplňte datum splatnosti"
                            value = {dateStringFormatter(invoice.dueDate)}
                            handleChange = {(e) => {
                                setInvoice({...invoice, dueDate: e.target.value})
                            }}
                        />
                    </div>
                    <div className="col-md-4">
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
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-4">
                        <InputField
                            required = {true}
                            type = "number"
                            name = "price"
                            label = "Cena (Kč)"
                            prompt = "Vyplňte cenu"
                            value = {invoice.price}
                            handleChange = {(e) => {
                                setInvoice({...invoice, price: e.target.value})
                            }}
                        />
                    </div>
                    <div className="col-md-4">
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
                    </div>
                    <div className="col-md-4">
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
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-1 col-2">
                        <button type="sumbit" className="btn btn-outline-primary ">Uložit</button>
                    </div>
                    <div className="col-md-1 col-2">
                        <Link to={"/invoices"} className="btn btn-outline-success">
                            Zpět
                        </Link>
                    </div>
                </div>
            </form>
            
        </div>
    );
    
};


export default InvoiceForm;