import { Form, Button } from 'react-bootstrap';
import './buttons.css';

function Search() {
  return (
    <Form className="d-flex">
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        style={{ width: '200px' }}
      />
      <Button className="filter-sort-search" variant="outline-success">
        Search
      </Button>
    </Form>
  );
}

export default Search;
