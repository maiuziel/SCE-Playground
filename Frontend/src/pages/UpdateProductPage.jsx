import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { StoreContext } from '../store/StoreContext';
import '../App.css';
import { Form, Button, Container, Stack } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import AddProductForm from '../components/AddProductForm';

export default function EditProductPage(product) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useContext(StoreContext);
  const [originalData, setOriginalData] = useState(null);

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await api.get(`/products/read-product/${id}`);
        setFormData({
          name: res.data.name || '',
          category: res.data.category || '',
          description: res.data.description || '',
          price: res.data.price || '',
          image_url: res.data.image_url || '',
          datasheet_url: res.data.datasheet_url || '',
          extra_images: res.data.extra_images || [],
        });
      } catch (err) {
        console.error('שגיאה בטעינת מוצר', err);
      }
    }
    fetchProduct();
  }, [id]);

  const handleUpdate = async (updatedData) => {
    try {
      await api.put(`/products/update-product/${id}`, updatedData);
      alert('המוצר עודכן בהצלחה!');
      navigate(`/products/${id}`);
    } catch (err) {
      console.error('שגיאה בעדכון המוצר', err);
      alert('שגיאה בעדכון המוצר');
    }
  };

  if (!user || user.email !== 'admin@gmail.com') {
    return <div>אין לך הרשאה לערוך מוצרים.</div>;
  }

  return (
    <Container style={{ maxWidth: '600px', marginTop: '2rem' }}>
      <h2 className="text-center">עריכת מוצר</h2>
      {formData ? (
        <AddProductForm initialData={formData} onSubmit={handleUpdate} />
      ) : (
        <p>טוען נתוני מוצר...</p>
      )}
    </Container>
  );
}

//  <Form onSubmit={handleSubmit}>
//         <Form.Group className="mb-3">
//           <Form.Label dir="rtl">שם</Form.Label>
//           <Form.Control
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//           />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label dir="rtl">תיאור</Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={3}
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//           />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label dir="rtl">מחיר</Form.Label>
//           <Form.Control
//             type="number"
//             name="price"
//             value={formData.price}
//             onChange={handleChange}
//           />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label dir="rtl">קטגוריה</Form.Label>
//           <Form.Control
//             type="text"
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//           />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label dir="rtl">כתובת תמונה</Form.Label>
//           <Form.Control
//             type="text"
//             name="img_url"
//             value={formData.image_url}
//             onChange={handleChange}
//           />
//         </Form.Group>
//         <Stack direction="horizontal" gap={3}>
//           <Button variant="success" type="submit">
//             שמור שינויים
//           </Button>

//           <Button variant="warning" type="button" onClick={handleCancel}>
//             בטל שינויים וחזור לדף המוצר
//           </Button>
//           <Button
//             variant="secondary"
//             type="button"
//             onClick={() => setFormData(originalData)}
//           >
//             אפס
//           </Button>
//         </Stack>
//       </Form>
