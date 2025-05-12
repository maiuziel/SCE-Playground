import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './buttons.css';
import { useState } from 'react';

function SortDropdown(props) {
  const [products, setProducts] = useState(props.products);

  function sortHighToLow() {}

  function sortLowToHigh() {}

  return (
    <Dropdown>
      <Dropdown.Toggle className="filter-sort-search" variant="secondary">
        Sort by
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={sortHighToLow} href="#">
          Price: High to Low
        </Dropdown.Item>
        <Dropdown.Item onClick={sortLowToHigh} href="#">
          Price: Low to High
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default SortDropdown;
