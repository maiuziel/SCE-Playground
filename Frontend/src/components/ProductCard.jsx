import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProductCard(props) {
  return (
    <Link to={props.id}>
      <div className="card" style={{ width: '18rem' }}>
        <img
          src={props.img}
          className="card-img-top"
          alt="A product"
          style={{ height: '200px' }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
