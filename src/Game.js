import { useState } from "react";
import "./Game.css";

/**
 * Square in Game board
 *
 * @param {number} num number
 * @param {string} className class name
 * @param {function} onClick click event
 * @param {string} value display value
 * @return {JSX.Element}
 * @constructor
 */
function Square({ num, className, onClick, value }) {
  return (
    <button data-num={num} className={className} onClick={onClick}>
      {value}
    </button>
  );
}

/**
 * Game board
 *
 * @param {Array} lines highlight
 * @param {Array} squares display value in squares
 * @param {function} onClick click event
 * @return {JSX.Element}
 * @constructor
 */
function Board({ lines, squares, onClick }) {
  const rows = [...Array(3)].map((_, row) => {
    const cells = [...Array(3)].map((__, col) => {
      const i = row * 3 + col;
      const highlight = lines[row] === i || lines[col] === i;
      const className = highlight ? "square highlight" : "square";
      return (
        <Square
          key={i}
          num={i}
          value={squares[i]}
          className={className}
          onClick={() => onClick(row, col)}
        />
      );
    });
    return (
      <div className="board-row" key={row}>
        {cells}
      </div>
    );
  });
  return <div>{rows}</div>;
}

/**
 * Toggle button by sort history
 *
 * @param {function} onClick click event
 * @param {boolean} isToggleOn toggle on/off
 * @return {JSX.Element}
 * @constructor
 */
function Toggle({ onClick, isToggleOn }) {
  return <button onClick={onClick}>{isToggleOn ? "昇順" : "降順"}</button>;
}

/**
 * Game
 *
 * @return {JSX.Element}
 * @constructor
 */
function Game() {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
      row: null,
      col: null,
    },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [isToggleOn, setToggleOn] = useState(true);
  const [selected, setSelected] = useState(null);

  /**
   * click board
   *
   * @param {number} row row number
   * @param {number} col column number
   */
  function handleClick(row, col) {
    const i = row * 3 + col;
    const _history = history.slice(0, stepNumber + 1);
    const current = _history[_history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";

    setHistory(
      _history.concat([
        {
          squares: squares,
          row: row,
          col: col,
        },
      ])
    );
    setStepNumber(_history.length);
    setXIsNext(!xIsNext);
    setSelected(null);
  }

  /**
   * click history button
   *
   * @param {number} step click history step number
   */
  function jumpTo(step) {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
    setSelected(step);
  }

  /**
   * click toggle button
   */
  function onToggleClick() {
    setToggleOn(!isToggleOn);
  }

  /**
   * judge draw game
   *
   * @param {Array} squares display value in square
   * @return {boolean} draw is true
   */
  function draw(squares) {
    return squares.find((v) => v === null) === undefined;
  }

  /**
   * calculate winner
   *
   * @param {Array} squares display values in squares
   * @return {{lines: number[], player: *}|null}
   */
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return {
          player: squares[a],
          lines: lines[i],
        };
      }
    }
    return null;
  }

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
  let moves = history.map((step, move) => {
    const desc = move
      ? `Go to move #${move} (${step.col + 1}, ${step.row + 1})`
      : "Go to game start";
    const className = selected === move ? "selected" : "";
    return (
      <li key={move}>
        <button className={className} onClick={() => jumpTo(move)}>
          {desc}
        </button>
      </li>
    );
  });
  if (!isToggleOn) {
    moves = moves.reverse();
  }
  let status;
  if (winner) {
    status = `Winner: ${winner.player}`;
  } else if (draw(current.squares)) {
    status = "Draw";
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }
  const lines = winner ? winner.lines : Array(3).fill(null);

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          lines={lines}
          onClick={(row, col) => handleClick(row, col)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <Toggle isToggleOn={isToggleOn} onClick={() => onToggleClick()} />
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default Game;