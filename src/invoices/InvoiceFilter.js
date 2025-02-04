import React, { useState, useEffect } from "react";
import InputSelect from "../components/InputSelect";
import InputField from "../components/InputField";


const InvoiceFilter = (props) =>{


    const handleChange = (e) =>{
        props.handleChange(e);
    }

    const handleSubmit = (e) => {
        props.handleSubmit(e);
    }


    const filter = props.filter;

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col">
                    <InputSelect
                        name="buyerId"
                        handleChange={handleChange}
                        value={filter.buyerId}
                        items={props.persons}
                        label="Kupující"
                        prompt="nevybrán"
                    />
                </div>
                <div className="col">
                    <InputSelect
                    name="sellerId"
                    handleChange={handleChange}
                    value={filter.sellerId}
                    items={props.persons}
                    label="Prodejce"
                    prompt="nevybrán"
                    />
                </div>
                <div className="col">
                    <InputField
                        name="product"
                        handleChange={handleChange}
                        value={filter.product}
                        type="text"
                        label="Produkt"
                        prompt="Název produktu"
                    />
                </div>
                <div>
                    <InputField
                        name="minPrice"
                        handleChange={handleChange}
                        value={filter.minPrice}
                        type="number"
                        label="Cena od"
                        prompt=""
                    />
                </div>
                <div>
                    <InputField
                        name="maxPrice"
                        handleChange={handleChange}
                        value={filter.maxPrice}
                        type="number"
                        label="Cena do"
                        prompt=""
                    />
                </div>
                <div>
                    <InputField
                        name="limit"
                        handleChange={handleChange}
                        value={filter.limit}
                        type="number"
                        label="Limit"
                    
                    />
                </div>

                <div className="row">
                <div className="col">
                    <input
                        type="submit"
                        className="btn btn-secondary float-right mt-2"
                        value={props.confirm}
                    />
                </div>
            </div>

            </div>
        </form>
    );
}

export default InvoiceFilter;