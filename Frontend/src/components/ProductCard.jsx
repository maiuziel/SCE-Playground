import Card from 'react-bootstrap/Card';
import { Link, Routes, BrowserRouter } from 'react-router-dom';
import './ProductCard.css';

function ProductCard(props) {
  return (
    <Link to={`/products/${props.id}`}>
      <Card className="product-card">
        <Card.Img className="card-img" variant="top" src={props.img} />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Title>{props.price} ₪</Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default ProductCard;
