import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Form } from 'react-bootstrap';

function PriceSlider(props) {
  const handleChange = (newValue) => {
    props.onPriceChange(newValue);
  };

  return (
    <>
      <Form.Label>Price Range</Form.Label>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>{props.value[0]}</span>
        <span>{props.value[1]}</span>
      </div>
      <Slider
        range
        min={props.minPrice}
        max={props.maxPrice}
        value={props.value}
        onChange={handleChange}
      />
    </>
  );
}

export default PriceSlider;
