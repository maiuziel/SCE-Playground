import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './buttons.css';
import { useState } from 'react';

function SortDropdown(props) {
  return (
    <Dropdown>
      <Dropdown.Toggle className="filter-sort-search" variant="outline-primary">
        Sort by
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={props.sortHighToLow} href="#">
          Price: High to Low
        </Dropdown.Item>
        <Dropdown.Item onClick={props.sortLowToHigh} href="#">
          Price: Low to High
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default SortDropdown;
