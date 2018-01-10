import React from 'react';
import DisplayRow from './DisplayRow.js';

//    <tr>{DisplayRow(props.game[rowName], rowName, props)}</tr>

function GameBoard(props){
  return Object.keys(props.board).map(rowName => (
      <tr>
        <DisplayRow
          board={props.board}
          handleInput={props.handleInput}
          row={rowName}/>
      </tr>
  ))
}

export default GameBoard;
