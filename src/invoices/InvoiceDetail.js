import React, { useState, useEffect} from "react";

import { apiGet } from "../utils/api";
import { Link, useParams, useNavigate } from "react-router-dom";
import dateStringFormatter from "../utils/dateStringFormatter";

const InvoiceDetail = () => {
    const {id} = useParams();
    const [invoice, setInvoice] = useState({});
    const [sellerName, setSellerName] = useState("");
    const [buyerName, setBuyerName] = useState("");
    const [sellerId,setSellerId] = useState("");
    const [buyerId, setBuyerId] = useState("");
    const [isSellerHidden, setSellerHidden] = useState(false);
    const [isBuyerHidden, setBuyerHidden] = useState(false);
    const navigate = useNavigate();
    const IssuedFormated = dateStringFormatter(invoice.issued, true);
    const DueDateFormated = dateStringFormatter(invoice.dueDate,true);

    const handleGoBack = () => {
        navigate(-1);
    }


    useEffect(() => {
        apiGet("/api/invoices/" + id)
        .then((data) => {
            setInvoice(data);
            
        })
        .catch((error) => {
            console.error(error);
        })
    }, []);

    useEffect(() => {
        apiGet("/api/invoices/" + id)
        .then((data) => {
            setSellerName(data.seller.name);
            setBuyerName(data.buyer.name);
            setSellerId(data.seller._id);
            setBuyerId(data.buyer._id);
            setBuyerHidden(data.buyer.hidden);
            setSellerHidden(data.seller.hidden);
            
            

        })
    },[invoice]);


    return (
        <div className="text-light">
            <h1>Detail faktury</h1>
            <br/>
            <table className="table text-light">
                
                    <tbody>
                        <tr>
                            <td className="fw-bold">Číslo faktury</td>
                            <td>{invoice.invoiceNumber}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Prodejce</td>
                            {isSellerHidden ? 
                                <td>{sellerName} (data uživatele již nejsou dostupná)</td>
                                :
                                <td><Link to={"/persons/show/" + sellerId}>{sellerName}</Link></td>
                            }
                                
                        </tr>
                        <tr>
                            <td className="fw-bold">Kupující</td>
                            {isBuyerHidden ?
                                <td>{buyerName} (data uživatele již nejsou dostupná)</td>
                                :
                                <td><Link to={"/persons/show/" + buyerId}>{buyerName}</Link></td>
                            }
                        </tr>
                        <tr>
                            <td className="fw-bold">Vystavena</td>
                            <td>{IssuedFormated}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Datum splatnosti</td>
                            <td>{DueDateFormated}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Produkt</td>
                            <td>{invoice.product}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Cena</td>
                            <td>{invoice.price}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">DPH</td>
                            <td>{invoice.vat}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold">Poznámka</td>
                            <td>{invoice.note}</td>
                        </tr>
                    </tbody>
                </table>
            <div>
                <button onClick={handleGoBack} className="btn btn-outline-success">
                    Zpět
                </button>
            </div>
            
        </div>

    );

}

export default InvoiceDetail;