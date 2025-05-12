import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { StoreContext } from '../store/StoreContext';
import '../App.css';
import { Form, Button, Container, Stack } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';

export default function EditProductPage(product) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useContext(StoreContext);
  const [originalData, setOriginalData] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    img_url: ''
  });

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await api.get(`/products/read-product/${id}`);
        setFormData(res.data);
        setOriginalData(res.data);
      } catch (err) {
        console.error('שגיאה בטעינת מוצר', err);
      }
    }
    fetchProduct();
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.put(`/products/update-product/${id}`, formData);
      alert('המוצר עודכן בהצלחה!');
      navigate(`/products/${id}`);
    } catch (err) {
      console.error('שגיאה בעדכון המוצר', err);
    }
  }

  function handleCancel(e) {
  alert('עדכון המוצר בוטל בהצלחה!');
  navigate(`/products/${id}`);
}


  if (!user || user.email !== 'admin@gmail.com') {
    return <div>אין לך הרשאה לערוך מוצרים.</div>;
  }

  return (
        <Container style={{ maxWidth: '600px', marginTop: '2rem' }}>
      <h2 className='text-center' >עריכת מוצר</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label dir='rtl'>שם</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label dir='rtl'>תיאור</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label dir='rtl'>מחיר</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label dir='rtl'>קטגוריה</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label dir='rtl'>כתובת תמונה</Form.Label>
          <Form.Control
            type="text"
            name="img_url"
            value={formData.image_url}
            onChange={handleChange}
          />
        </Form.Group>
        <Stack direction="horizontal" gap={3}>
                <Button variant="success" type="submit">
          שמור שינויים
        </Button>

                <Button variant="warning" type="button" onClick={handleCancel}>
           בטל שינויים וחזור לדף המוצר
        </Button>
        <Button variant="secondary" type="button" onClick={() => setFormData(originalData)}>
          אפס
        </Button>
            </Stack>
    </Form>
    </Container>   
      
  );
}
