import React, { useState, useEffect} from "react";
import { apiGet } from "../utils/api";

const PersonStatistics = ({id}) => {
    const [personStatisticsState, setPersonStatistics] = useState([]);
    const [revenueState, setRevenueState] = useState("")


    useEffect(() => {
        apiGet("/api/persons/statistics").then((data) => {
        setPersonStatistics(data)})
        .catch((error) =>{
            console.error(error);
        });
    },[]);


    useEffect(() => {
        for(const stats of personStatisticsState){
            if(stats.personId == id){
                setRevenueState(stats.revenue);
                break;
            }
        };
    }, [personStatisticsState, id])

    return (
        <div>
            {revenueState ? (
                <div>{revenueState} Kč</div>
            ):
            (<div>0 kč</div>)}
        </div>
    );
}

export default PersonStatistics;