import React from "react";
import { Link } from "react-router-dom";

/**
 * component which fetches from API invoices of conrete person based od invoiceType
 * @param {*} props 
 * @param {Object} invoiceType sets an type of invoice according to concrete person (purchase or sale)
 * @returns a table with invoices represented by invoiceNumber and note
 */
const PersonInvoices = ({invoicesType, label}) => {


    return(
        <div className="table-responsive">
    
            <h4>{label}</h4>
            <table className="table">
                <thead>
                    <tr>
                        <td className="col fw-bold col-6">Číslo faktury</td>
                        <td className="fw-bold">Poznámka</td>
                    </tr>
                </thead>
                <tbody>
                    {invoicesType.map((item) => (
                        <tr>
                            <td><Link to={"/invoices/show/" + item._id}>{item.invoiceNumber}</Link></td>
                            <td>{item.note}</td>
                       </tr> 
                    ))}
                </tbody>
            </table>    
        </div>
    );
}

export default PersonInvoices;