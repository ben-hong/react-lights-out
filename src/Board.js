import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";
import randomLights from "./randomLightsOn"

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 1, ncols = 1, chanceLightStartsOn = randomLights }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for (let y = 0; y < nrows; y++) {
      let innerArr = [];
      for (let x = 0; x < ncols; x++) {
        innerArr.push(chanceLightStartsOn());
      }
      // innerArr => [true, false, true, false, false, true]
      initialBoard.push(innerArr);
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.

    return board.map(row => row.every(cell => cell === false)).every((r) => r === true);
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);
      // TODO: Make a (deep) copy of the oldBoard

      const boardCopy = oldBoard.map(rows => [...rows]);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it
        // TODO: in the copy, flip this cell and the cells around it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
          if (boardCopy[y + 1] && boardCopy[y + 1][x] !== undefined) {
            boardCopy[y + 1][x] = !boardCopy[y + 1][x];
          }
          if (boardCopy[y - 1] && boardCopy[y - 1][x] !== undefined) {
            boardCopy[y - 1][x] = !boardCopy[y - 1][x];
          }
          if (boardCopy[y][x + 1] !== undefined) {
            boardCopy[y][x + 1] = !boardCopy[y][x + 1];
          }
          if (boardCopy[y][x - 1] !== undefined) {
            boardCopy[y][x - 1] = !boardCopy[y][x - 1];
          }

        }
      };

      flipCell(y, x, boardCopy);

      // REFACTOR PER SOLUTION:
      // flipCell(y, x, boardCopy);
      // flipCell(y, x - 1, boardCopy);
      // flipCell(y, x + 1, boardCopy);
      // flipCell(y - 1, x, boardCopy);
      // flipCell(y + 1, x, boardCopy);

      return boardCopy;
      // TODO: return the copy
    });
  }

  // if the game is won, just show a winning msg & render nothing else


  // flipCellsAround = {() => flipCellsAroundMe(`${row/>)}

  return (
    <div className="Board-container">
      <div>{
          hasWon() ? "You won the game!" : 
          <table className="Board-table">
            <tbody>
              {board.map((row, rowIdx) => <tr>{row.map((cell, cellIdx) =>
              (<Cell isLit={cell}
                flipCellsAroundMe={() => flipCellsAround(`${rowIdx}-${cellIdx}`)} />))}
              </tr>
              )}
            </tbody>
          </table>
          }
      </div>
    </div>
  )
}

export default Board;
