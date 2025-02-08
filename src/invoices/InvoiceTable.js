import React from "react";
import { Link } from "react-router-dom";

const InvoiceTable = ({items, deleteInvoice, label}) => {
    return(
    <div>
        <p>{label} {items.length}</p>
        <table className="table table-bordered text-light">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Číslo faktury</th>
                    <th>Poznámka</th>
                    <th className="col-4">Akce</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.invoiceNumber}</td>
                        <td>{item.note}</td>
                        <td>
                            <div className="btn-group">
                                <Link
                                    to={"/invoices/show/" + item._id}
                                    className="btn btn-sm btn-outline-info"
                                >
                                    Detail
                                </Link>
                                <Link
                                    to={"/invoices/edit/" + item._id}
                                    className="btn btn-sm btn-outline-warning"
                                >
                                    Upravit
                                </Link>
                                <button
                                    onClick={() => deleteInvoice(item._id)}
                                    className="btn btn-sm btn-outline-danger"
                                    >   
                                    Vymazat
                                </button>

                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <Link to={"/invoices/create"} className="btn btn-outline-success">
                Nová faktura
            </Link>
    </div>
    );
};

export default InvoiceTable;