import React from 'react';
import SquareValue from '../models/SquareValue';

interface SquareProps {
    value: SquareValue;
    onClick: () => void
}

const Square: React.FC<SquareProps> = ({ value, onClick }) => (
  <button type="button" className="square" onClick={onClick}>
    {value}
  </button>
);

export default Square;
