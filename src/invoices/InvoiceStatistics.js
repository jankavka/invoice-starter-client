import React, { useEffect, useState} from "react";
import { apiGet } from "../utils/api";

/**
 * component which fetches invoice statistics from API
 * @returns JSX as a table of invoice statistics
 */
const InvoiceStatistics = () => {
    const [currentYearSum, setCurrentYearSum] = useState("");
    const [allTimeSum, setAllTimeSum] = useState("");
    const [invoicesCount, setInvoicesCount] = useState("");

    useEffect(() => {
        apiGet("/api/invoices/statistics").then((data) => {
            setCurrentYearSum(data.currentYearSum);
            setAllTimeSum(data.allTimeSum);
            setInvoicesCount(data.invoicesCount);
        })
        .catch((error) => {
            console.error(error);
        })
    }, []);

    return (
        <div className="mt-3">
            <h4>Statistiky všech faktur:</h4>
            <table className="table table-bordered text-light">
                <tbody>
                    <tr>
                        <td className="col-8">Součet cen v akutálním roce:</td>
                        <td>{currentYearSum} Kč</td>
                    </tr>
                    <tr>
                        <td>Součet všech cen</td>
                        <td>{allTimeSum} Kč</td>
                    </tr>
                    <tr>
                        <td>počet faktur</td>
                        <td>{invoicesCount} ks</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )

}

export default InvoiceStatistics;