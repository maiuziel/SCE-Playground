// components/FilterOffcanvas.jsx
import React, { useState, useEffect } from 'react';
import { Button, Offcanvas, Form } from 'react-bootstrap';
import PriceSlider from './PriceSlider';
import './buttons.css';

const FilterOffcanvas = ({ allProducts, setDisplayedProducts }) => {
  const categories = [
    ...new Set(
      allProducts
        .map((product) => product.category)
        .filter((category) => category)
    ),
  ];

  const [show, setShow] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: 0,
    maxPrice: 0,
  });

  useEffect(() => {
    if (allProducts.length > 0) {
      const prices = allProducts.map((product) => product.price);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      setFilters((prev) => ({
        ...prev,
        minPrice: min,
        maxPrice: max,
      }));
    }
  }, [allProducts]);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleApply = () => {
    const { category, minPrice, maxPrice } = filters;

    let filtered = [...allProducts];

    if (category && category !== 'Choose Category') {
      filtered = filtered.filter((product) => product.category === category);
    }

    filtered = filtered.filter(
      (product) =>
        product.price >= Number(minPrice) && product.price <= Number(maxPrice)
    );

    setDisplayedProducts(filtered);
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
        Filter by <i className="bi bi-funnel"></i>
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filters</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={filters.category}
                onChange={handleChange}
              >
                <option value="">Choose Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4">
              <PriceSlider
                minPrice={Math.min(...allProducts.map((p) => p.price))}
                maxPrice={Math.max(...allProducts.map((p) => p.price))}
                onPriceChange={handlePriceChange}
                value={[filters.minPrice, filters.maxPrice]}
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
