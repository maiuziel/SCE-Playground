import Card from 'react-bootstrap/Card';
import { Link, Routes, BrowserRouter } from 'react-router-dom';

function ProductCard(props) {
  return (
    <Link to={`/products/${props.id}`}>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={props.img} style={{ height: '200px' }} />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default ProductCard;
