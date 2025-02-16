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

import {apiDelete, apiGet} from "../utils/api";

import PersonTable from "./PersonTable";
import FlashMessage from "../components/FlashMessage";
import { useLocation } from "react-router-dom";


const PersonIndex = () => {
    const [persons, setPersons] = useState([]);
    const [fetchMessage, setFetchMessage] = useState("Načítám osoby...");
    const location = useLocation();
    const successState = ({createSuccessState:false});
    const newPersonState = ({newPerson:false});
    const [deleteSuccessState, setDeleteSuccessState] = useState({deleteSuccess:false});
    const {deleteSuccess} = location.state || deleteSuccessState;
    const {createSuccessState} = location.state || successState;
    const {newPerson} = location.state || newPersonState;
    

    const deletePerson = async (id) => {
        try {
            await apiDelete("/api/persons/" + id);

        } catch (error) {
            console.log(error.message);
            alert(error.message)   
        }
        setPersons(persons.filter((item) => item._id !== id));
        setDeleteSuccessState({deleteSuccess:true});
        
    };

    useEffect(() => {
        apiGet("/api/persons").then((data) => setPersons(data));
    }, []);

        

    if(persons.length === 0){
        setTimeout(()=> setFetchMessage("Nepodařilo se načíst osoby..."),10000);
        return (
            <div>
                <h1>Seznam osob</h1>
                <p>{fetchMessage}</p>
            </div>
        );
    };

    
    return (
        <div className="text-light">
            <h1>Seznam osob</h1>
            {newPerson ?
            <div>
                <FlashMessage
                    theme="success"
                    text="Vytvoření nové osobnosti proběhlo úspěšně"
                    items={persons}
                />
            </div>:
            createSuccessState ?
            <div>
                <FlashMessage
                    theme= "success"
                    text="Aktualizace osobnosti proběhla úspěšně"
                    items={persons}
                    
                /> 
            </div>: null}
            {deleteSuccess ?
            <div>
                <FlashMessage
                    theme="success"
                    text="Vymazání osoby proběhlo úspěšně"
                    items={persons}
                />
            </div>
            : null}
            <PersonTable
                deletePerson={deletePerson}
                items={persons}
                label="Počet osob:"
            />
        </div>
    );
};

export default PersonIndex;
