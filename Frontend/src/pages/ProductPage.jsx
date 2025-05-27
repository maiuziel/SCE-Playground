import './ProductPage.css';
import { useEffect, useState, useContext } from 'react';
import api from '../services/api.js';
import '../App.css';
import { StoreContext } from '../store/StoreContext.jsx';
import { jwtDecode } from 'jwt-decode';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ProductPageUI from '../components/prodDetailsAndBuyButton.jsx';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { user, token } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProductById() {
      try {
        const response = await api.get(`/products/read-product/${id}`);
        setProduct(response.data);
      } catch (err) {
        console.error('Error loading product', err);
      }
    }
    fetchProductById();
  }, [id]);
  console.log('Product data from DB:', product);

  async function deleteProductById() {
    const confirmDelete = window.confirm(
      'האם אתה בטוח שברצונך למחוק את המוצר?'
    );
    if (!confirmDelete) return;

    try {
      const response = await api.delete(`/products/delete-product/${id}`);
      alert('המוצר נמחק בהצלחה');
      navigate('/products');
    } catch (err) {
      console.error('Error loading product', err);
      alert('אירעה שגיאה במחיקת המוצר');
    }
  }

  function EditProduct() {
    const confirmEdit = window.confirm('האם אתה בטוח שברצונך לערוך את המוצר?');
    if (!confirmEdit) return;

    navigate(`/products/update-product/${id}`);
  }

  function ProductLeads() {
    navigate(`/products/${id}/leads`);
  }

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-page">
      {true && ( //user?.email === 'admin@gmail.com'
        <div className="admin-buttons">
          <button className="btn btn-sm btn-primary" onClick={EditProduct}>
            <i class="bi bi-pencil"></i>
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => deleteProductById()}
          >
            <i class="bi bi-trash"></i>
          </button>
          <button className="btn btn-sm btn-secondary" onClick={ProductLeads}>
            Leads
          </button>
        </div>
      )}
      <div className="product-container">
        <ProductPageUI product={product} />
      </div>
    </div>
  );
  // };
}
