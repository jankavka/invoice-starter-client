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
import {Link, useParams, useNavigate} from "react-router-dom";

import {apiGet} from "../utils/api";
import Country from "./Country";
import PersonInvoices from "./PersonInvoices";


const PersonDetail = () => {
    const {id} = useParams();
    const [person, setPerson] = useState({});
    const [salesState, setSales] = useState([]);
    const [purchasesState, setPurchases] = useState([]);
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    }

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
    },[person])


    return (
        <>
            <div>
                <h1>Detail osoby: {person.name}</h1>
                <hr/>
                <div className="row mb-3">
                    <div className="col">
                        <table className="table text-light">
                            <tbody>
                                <tr>
                                    <td className="fw-bold col-6">DIČ</td>
                                    <td>{person.taxNumber}</td>
                                </tr>
                                <tr>
                                    <td className="fw-bold">IČO</td>
                                    <td>{person.identificationNumber}</td>
                                </tr>
                                <tr>
                                    <td className="fw-bold">Bankovní účet</td>
                                    <td>{person.accountNumber}/{person.bankCode} ({person.iban})</td>
                                </tr>
                                <tr>
                                    <td className="fw-bold">Tel.:</td>
                                    <td>{person.telephone}</td>
                                </tr>
                                <tr>
                                    <td className="fw-bold">Mail</td>
                                    <td>{person.mail}</td>
                                </tr>
                                <tr>
                                    <td className="fw-bold">Sídlo</td>
                                    <td>{person.street}, {person.city},
                                    {person.zip}, {country}</td>
                                </tr>
                                <tr>
                                    <td className="fw-bold">Poznámka</td>
                                    <td>{person.note}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <PersonInvoices
                            invoicesType={salesState}
                            label="Vystavené faktury"
                        />
                    </div>

                    <div className="col">
                        <PersonInvoices
                            invoicesType={purchasesState}
                            label="Přijaté faktury"
                        />
                    </div>
                </div>
                
            </div>
            <div>
                <button onClick={handleGoBack} className="btn btn-outline-success">
                    Zpět
                </button>
            </div>
        </>
    );
};

export default PersonDetail;
