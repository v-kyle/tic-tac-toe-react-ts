import React, { useState } from 'react';
import Board from './Board';
import calculateWinner from '../services/calculateWinner';

const Game: React.FC = () => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);

  function jumpTo(step: number) {
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
  }

  function handleClick(i: number) {
    const copyHistory = history.slice(0, stepNumber + 1);
    const current = copyHistory[copyHistory.length - 1];

    const copySquares = current.squares.slice();
    if (calculateWinner(copySquares) || copySquares[i]) {
      return;
    }
    copySquares[i] = xIsNext ? 'X' : 'O';
    setHistory(copyHistory.concat([{ squares: copySquares }]));
    setStepNumber(copyHistory.length);
    setXIsNext((prevState) => !prevState);
  }

  const copyHistory = history;
  const current = copyHistory[stepNumber];
  const winner = calculateWinner(current.squares);
  let status;
  if (winner) {
    status = `Выиграл ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  const moves = copyHistory.map((_step, move) => {
    const desc = move ? `Перейти к ходу #${move}` : 'К началу игры';
    return (
    // eslint-disable-next-line react/no-array-index-key
      <li key={move}>
        <button type="button" onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;
