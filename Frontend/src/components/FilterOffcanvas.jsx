// components/FilterOffcanvas.jsx
import React, { useState } from 'react';
import { Button, Offcanvas, Form } from 'react-bootstrap';
import PriceSlider from './PriceSlider';
import './buttons.css';

const FilterOffcanvas = ({ onApplyFilters }) => {
  const [show, setShow] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
  });

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleApply = () => {
    onApplyFilters(filters);
    handleClose();
  };

  return (
    <>
      <Button
        className="filter-sort-search"
        variant="primary"
        onClick={handleShow}
      >
        Filter by
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title> Filters </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select name="category" onChange={handleChange}>
                <option value="">בחר קטגוריה</option>
                <option value="electronics">אלקטרוניקה</option>
                <option value="clothing">ביגוד</option>
                <option value="home">מוצרים לבית</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-4">
              <PriceSlider />
            </Form.Group>
            <Form.Group className="d-flex justify-content-center mt-3">
              <Button variant="success" onClick={handleApply} className="me-2">
                Apply
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
            </Form.Group>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default FilterOffcanvas;
