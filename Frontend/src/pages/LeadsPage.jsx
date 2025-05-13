import './LeadsPage.css';
import '../App.css';
import { useParams, useNavigate, Link, Navigate } from 'react-router-dom';
import LeadsTable from '../components/LeadsPageComponent';
import { Container, Row, Col, Button, Image, Stack, Badge } from 'react-bootstrap';


export default function LeadsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    function BackToProduct(){
        navigate(`/products/${id}`);
    }


    return(
        <div className="leads-container">
            <div className="leads-title">
                <h1 className='text-center'>Product Leads</h1>
                <div className="d-flex justify-content-start" style={{ width: "10rem"}}>
                    <Button style={{width: "5rem", margin:10, fontSize:'large'}}  variant='secondary' size='sm' onClick={BackToProduct}>back to product</Button>
                </div>
            </div>
            <div className="leads-table">
                <LeadsTable />
            </div>
        </div>
    );
};
