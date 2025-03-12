import React, { useEffect, useState } from "react"
import { apiGetPdf } from "../utils/api"
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const InvoicePdfViewer = () => {
    const [invoicePdf, setInvoicePdf] = useState(null);
    const {id} = useParams();
    const navigate = useNavigate();

    const handleGoBack = () => {
        if(navigate(-1)){
            navigate(-1);
        }else{
            navigate("/invoices")
        }
    };

    useEffect(() => {
        apiGetPdf("/api/invoices/" + id + "/pdf")
        .then((data) => {
            setInvoicePdf(URL.createObjectURL(data))
            
        })
        .catch((error) => {
            console.error(error);
        })
        
    }, [id]);

    return (
        <div>
            <Link onClick={() => window.open(invoicePdf, "_blank")}  >
                    Otevřít v PDF novém okně
            </Link>
            
            {invoicePdf ?
                
               <iframe
                    src={invoicePdf}
                    style={{width: '100%', height: '100vh', overflow: 'auto' }} 
                />:
               <p>Fakturu se nepodařilo načíst</p>
            }
            <div className="clearfix"></div>
            <div>
                <button 
                    onClick={handleGoBack}
                    className="btn btn-outline-success col-2 "
                >
                    Zpět
                </button>
                
            </div>

        </div>
    )
}

export default InvoicePdfViewer;