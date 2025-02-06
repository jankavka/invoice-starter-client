import React from "react";

/**
 * component which fetches from API invoices of conrete person based od invoiceType
 * @param {*} props 
 * @param {Object} invoiceType sets an type of invoice according to concrete person (purchase or sale)
 * @returns a table with invoices represented by invoiceNumber and note
 */
const PersonInvoices = ({invoicesType, label}) => {


    return(
        <div>
            <h3 className="mt-5">{label}</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <td className="col-3">Číslo faktury</td>
                        <td>Poznámka</td>
                    </tr>
                </thead>
                <tbody>
                    {invoicesType.map((item) => (
                        <tr>
                            <td>{item.invoiceNumber}</td>
                            <td>{item.note}</td>
                       </tr> 
                    ))}
                </tbody>
            </table>    
        </div>
    );
}

export default PersonInvoices;