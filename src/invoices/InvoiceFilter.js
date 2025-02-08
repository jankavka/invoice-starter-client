import React, {useRef} from "react";
import InputSelect from "../components/InputSelect";
import InputField from "../components/InputField";

/**
 * This component sets filter values and then passes to the parental component. 
 * Methods handleChange and handle submit are defined in parental component.
 * 
 * @param {*} props 
 * @param {Object} filter object with values for filtration
 * @param {void} handleChange method which is defined in parental component
 * @param {void} handleSubmit method which is defined in parental component
 * @param {object} persons object for InputSelect fields
 * @returns and form for setting a filtration values
 */
const InvoiceFilter = (props) =>{

    const handleChange = (e) =>{
        props.handleChange(e);
    }

    const handleSubmit = (e) => {
        props.handleSubmit(e);
    }

    const handleReset = (e) => {
        e.preventDefault();
        props.handleReset();    
    }

    const filter = props.filter;

    return (
        <div className="mt-4 text-light">
            <h6>Filtrační parametry</h6>
                <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                        <div className="col">
                            <InputSelect
                                name="buyerId"
                                handleChange={handleChange}
                                value={filter.buyerId !== undefined ? filter.buyerId : ""}
                                items={props.persons}
                                label="Kupující"
                                prompt="nevybrán"
                            />
                        </div>
                        <div className="col">
                            <InputSelect
                                name="sellerId"
                                handleChange={handleChange}
                                value={filter.sellerId !== undefined ? filter.sellerId : ""}
                                items={props.persons}
                                label="Prodejce"
                                prompt="nevybrán"
                            />
                        </div>
                        <div className="col">
                            <InputField
                                name="product"
                                handleChange={handleChange}
                                value={filter.product !== undefined ? filter.product : ""}
                                type="text"
                                label="Produkt"
                                prompt="nezadáno"
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <InputField
                                name="minPrice"
                                handleChange={handleChange}
                                value={filter.minPrice !== undefined ? filter.minPrice : ""}
                                type="number"
                                label="Cena od"
                                prompt="nezadáno"
                            />
                        </div>
                        <div className="col">
                            <InputField
                                name="maxPrice"
                                handleChange={handleChange}
                                value={filter.maxPrice !== undefined ? filter.maxPrice : ""}
                                type="number"
                                label="Cena do"
                                prompt="nezadáno"
                            />
                        </div>
                        <div className="col">
                            <InputField
                                name="limit"
                                handleChange={handleChange}
                                value={filter.limit !== undefined ? filter.limit : ""}
                                type="number"
                                label="Limit"
                                prompt="nezadáno"
                            
                            />
                        </div>
                    </div>
                    <div className="col-12 d-flex mb-3">
                        <div className="">
                            <input
                                type="submit"
                                className="btn btn-outline-info me-2"
                                value={props.confirm}
                            />
                        </div>
                        <div>
                            <button onClick={handleReset} className="btn btn-outline-warning">
                                Reset
                            </button>
                        </div>
                    </div>
                </form>
        </div>
    );
}

export default InvoiceFilter;