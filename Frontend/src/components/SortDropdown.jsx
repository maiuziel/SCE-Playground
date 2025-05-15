import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './buttons.css';
import { useState } from 'react';

function SortDropdown(props) {
  const [selectedSort, setSelectedSort] = useState('Sort by');

  function displayNormal() {
    const sorted = [...props.displayedProducts].sort((a, b) => a.id - b.id);
    props.setDisplayedProducts(sorted);
    setSelectedSort('Sort by');
  }
  function sortHighToLow() {
    const sorted = [...props.displayedProducts].sort(
      (a, b) => b.price - a.price
    );
    props.setDisplayedProducts(sorted);
    setSelectedSort('High to Low');
  }

  function sortLowToHigh() {
    const sorted = [...props.displayedProducts].sort(
      (a, b) => a.price - b.price
    );
    props.setDisplayedProducts(sorted);
    setSelectedSort('Low to High');
  }

  return (
    <Dropdown>
      <Dropdown.Toggle className="filter-sort-search" variant="outline-primary">
        {selectedSort}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={displayNormal}>Sort by</Dropdown.Item>
        <Dropdown.Item onClick={sortHighToLow}>
          Price: High to Low
        </Dropdown.Item>
        <Dropdown.Item onClick={sortLowToHigh}>
          Price: Low to High
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default SortDropdown;
