import { Form, Button } from 'react-bootstrap';
import './buttons.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from 'react';

function Search(props) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value || '';
    setSearchTerm(value);
  };

  function search(searchTerm) {
    searchTerm = String(searchTerm).toLowerCase();
    const searched = [...props.allProducts].filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
    props.setDisplayedProducts(searched);
  }

  const handleSearchClick = (e) => {
    search(searchTerm);
  };

  return (
    <Form className="d-flex">
      <Form.Control
        type="search"
        placeholder="Search..."
        className="me-2 filter-sort-search"
        aria-label="Search"
        style={{
          width: '200px',
        }}
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <Button
        className="filter-sort-search"
        variant="outline-primary"
        style={{ width: '60px' }}
        onClick={handleSearchClick}
      >
        <i className="bi bi-search me-1"></i>
      </Button>
    </Form>
  );
}

export default Search;
