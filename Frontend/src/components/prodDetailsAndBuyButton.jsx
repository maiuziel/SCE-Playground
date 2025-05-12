import { Container, Row, Col, Button, Image, Stack } from 'react-bootstrap';

export default function ProductPageUI({ product }) {

    const handleAddToCart = () => {
    alert("כפתור הוסף לעגלה נלחץ");
    };

    const handleDownloadProduct = () => {
    alert("כפתור הורד קובץ נלחץ")
    };

  return (
    <Container className="my-5">
      <Row>
        {/* תמונה */}
        <Col md={6}>
          <Image src={product.image_url} className='w-100' fluid rounded />
        </Col>

        {/* פרטים */}
        <Col md={6}>
          <Row>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <h4>₪{product.price}</h4>
          
          </Row>
          <Row>
            
          </Row>
          <Row>
            <Stack direction="horizontal" gap={3}>
                <Button variant="primary" size="lg" onClick={handleAddToCart} >
                הוסף לסל
                </Button>

                <Button variant="info" size="lg" onClick={handleDownloadProduct}>
                הורד קובץ
                </Button>

            </Stack>
            
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
