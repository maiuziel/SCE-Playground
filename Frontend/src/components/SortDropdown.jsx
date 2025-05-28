import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './buttons.css';
import { useState } from 'react';

function SortDropdown(props) {
  const [selectedSort, setSelectedSort] = useState('Sort by');

  function displayNormal() {
    const sorted = [...props.productsToSort].sort((a, b) => a.id - b.id);
    props.setProductsToSort(sorted);
    setSelectedSort('Sort by');
  }
  function sortHighToLow() {
    const sorted = [...props.productsToSort].sort((a, b) => b.price - a.price);
    props.setProductsToSort(sorted);
    setSelectedSort('Price: High to Low');
  }

  function sortLowToHigh() {
    const sorted = [...props.productsToSort].sort((a, b) => a.price - b.price);
    props.setProductsToSort(sorted);
    setSelectedSort('Price: Low to High');
  }

  function sortLeadsHighToLow() {
    console.log(props.displayedProducts);
    const sorted = [...props.productsToSort].sort(
      (a, b) => b.lead_count - a.lead_count
    );
    props.setProductsToSort(sorted);
    setSelectedSort('Leads: High to Low');
  }

  function sortLeadsLowToHigh() {
    const sorted = [...props.productsToSort].sort(
      (a, b) => a.lead_count - b.lead_count
    );
    props.setProductsToSort(sorted);
    setSelectedSort('Leads: Low to High');
  }

  return (
    <Dropdown>
      <Dropdown.Toggle className="filter-sort-search" variant="outline-primary">
        {selectedSort}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={displayNormal}>Sort by</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={sortHighToLow}>
          Price: High to Low
        </Dropdown.Item>
        <Dropdown.Item onClick={sortLowToHigh}>
          Price: Low to High
        </Dropdown.Item>
        {props.isAdmin && (
          <>
            <Dropdown.Item onClick={sortLeadsHighToLow}>
              Leads: High to Low
            </Dropdown.Item>
            <Dropdown.Item onClick={sortLeadsLowToHigh}>
              Leads: Low to High
            </Dropdown.Item>
          </>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default SortDropdown;
