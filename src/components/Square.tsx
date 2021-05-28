import React from 'react';
import SquareValue from '../models/SquareValue';

const Square: React.FC<{value: SquareValue, onClick: () => void}> = ({ value, onClick }) => (
  <button type="button" className="square" onClick={onClick}>
    {value}
  </button>
);

export default Square;
