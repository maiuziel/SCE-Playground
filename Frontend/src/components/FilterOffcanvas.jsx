// components/FilterOffcanvas.jsx
import React, { useState } from 'react';
import { Button, Offcanvas, Form } from 'react-bootstrap';
import PriceSlider from './PriceSlider';
import './buttons.css';

const FilterOffcanvas = ({
  onApplyFilters,
  categories,
  minPrice,
  maxPrice,
  filterByCategory,
  filterByPrice,
}) => {
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
    const { category, minPrice, maxPrice } = filters;

    if (category) {
      filterByCategory(category);
    }

    if (minPrice && maxPrice) {
      filterByPrice(Number(minPrice), Number(maxPrice));
    }

    handleClose();
  };

  const handlePriceChange = (newPriceRange) => {
    setFilters({
      ...filters,
      minPrice: newPriceRange[0],
      maxPrice: newPriceRange[1],
    });
  };

  return (
    <>
      <Button
        className="filter-sort-search"
        variant="outline-primary"
        onClick={handleShow}
      >
        Filter by <i class="bi bi-funnel"></i>
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
                <option value=""> Choose Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-4">
              <PriceSlider
                minPrice={minPrice}
                maxPrice={maxPrice}
                onPriceChange={handlePriceChange}
              />
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
