/*  _____ _______         _                      _
 * |_   _|__   __|       | |                    | |
 *   | |    | |_ __   ___| |___      _____  _ __| | __  ___ ____
 *   | |    | | '_ \ / _ \ __\ \ /\ / / _ \| '__| |/ / / __|_  /
 *  _| |_   | | | | |  __/ |_ \ V  V / (_) | |  |   < | (__ / /
 * |_____|  |_|_| |_|\___|\__| \_/\_/ \___/|_|  |_|\_(_)___/___|
 *                                _
 *              ___ ___ ___ _____|_|_ _ _____
 *             | . |  _| -_|     | | | |     |  LICENCE
 *             |  _|_| |___|_|_|_|_|___|_|_|_|
 *             |_|
 *
 *   PROGRAMOVÁNÍ  <>  DESIGN  <>  PRÁCE/PODNIKÁNÍ  <>  HW A SW
 *
 * Tento zdrojový kód je součástí výukových seriálů na
 * IT sociální síti WWW.ITNETWORK.CZ
 *
 * Kód spadá pod licenci prémiového obsahu a vznikl díky podpoře
 * našich členů. Je určen pouze pro osobní užití a nesmí být šířen.
 * Více informací na http://www.itnetwork.cz/licence
 */

import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {apiGet} from "../utils/api";
import Country from "./Country";
import InvoiceTable from "../invoices/InvoiceTable";

const PersonDetail = () => {
    const {id} = useParams();
    const [person, setPerson] = useState({});
    const [salesState, setSales] = useState([]);
    const [purchasesState, setPurchases] = useState([]);

    useEffect(() => {
        // TODO: Add HTTP req.
        apiGet("/api/persons/" + id)
        .then((data) => {
            setPerson(data);
        })
        .catch((error) => {
            console.error(error);
        })
    }, [id]);
    const country = Country.CZECHIA === person.country ? "Česká republika" : "Slovensko";

    useEffect(() => {
        apiGet("/api/identification/" + person.identificationNumber + "/sales").then((data) => setSales(data));
        apiGet("/api/identification/" + person.identificationNumber + "/purchases").then((data) => setPurchases(data));
    })


    return (
        <>
            <div>
                <h1>Detail osoby</h1>
                <hr/>
                <h3>{person.name} ({person.identificationNumber})</h3>
                <p>
                    <strong>DIČ:</strong>
                    <br/>
                    {person.taxNumber}
                </p>
                <p>
                    <strong>Bankovní účet:</strong>
                    <br/>
                    {person.accountNumber}/{person.bankCode} ({person.iban})
                </p>
                <p>
                    <strong>Tel.:</strong>
                    <br/>
                    {person.telephone}
                </p>
                <p>
                    <strong>Mail:</strong>
                    <br/>
                    {person.mail}
                </p>
                <p>
                    <strong>Sídlo:</strong>
                    <br/>
                    {person.street}, {person.city},
                    {person.zip}, {country}
                </p>
                <p>
                    <strong>Poznámka:</strong>
                    <br/>
                    {person.note}
                </p>
                
                <h3 className="mt-5">Vystavené faktury:</h3>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <td className="col-3">Číslo faktury</td>
                            <td>Poznámka</td>
                        </tr>
                    </thead>
                    <tbody>
                        {salesState.map((item) => (
                           <tr>
                                <td>{item.invoiceNumber}</td>
                                <td>{item.note}</td>
                           </tr> 
                        ))}
                    </tbody>
                </table>

                <h3 className="mt-5">Přijaté faktury</h3>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <td className="col-3">Číslo faktury</td>
                            <td>Poznámka</td>
                        </tr>
                    </thead>
                    <tbody>
                        {purchasesState.map((item) => (
                           <tr>
                                <td >{item.invoiceNumber}</td>
                                <td>{item.note}</td>
                           </tr> 
                        ))}
                    </tbody>
                </table>

            </div>
        </>
    );
};

export default PersonDetail;
