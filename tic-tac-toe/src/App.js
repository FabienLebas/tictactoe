import React, { Component } from 'react';
import './App.css';
import GameBoard from './GameBoard.js';

const init = () => ({
  row1: Array(3).fill("_"),
  row2: Array(3).fill("_"),
  row3: Array(3).fill("_")
});

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      game: init(),
      player: "X",
      victoryEnd: false,
      drawEnd: false
    }
  }

  testVictoryLine(line){
  if (line.filter(cell => cell === this.state.player).length === 3){
    return true;
  }
  return false;
  }

  testVictoryColumn(number){
    if(this.state.game.row1[number] === this.state.game.row2[number] && this.state.game.row1[number] === this.state.game.row3[number] && this.state.game.row1[number] !== "_"){
      return true;
    }
    return false;
  }

  testVictoryDiagonale(){
    if ((this.state.game.row1[0] === this.state.game.row2[1] && this.state.game.row1[0] === this.state.game.row3[2] && this.state.game.row1[0] !== "_") ||
        this.state.game.row3[0] === this.state.game.row2[1] && this.state.game.row3[0] === this.state.game.row1[2] && this.state.game.row3[0] !== "_"){
          return true;
        }
    return false;
  }

  end(){
    if(this.state.victoryEnd){
      return (
        <h1 className="end">Victoire !</h1>
      )
    } else if (this.state.drawEnd){
      return (
        <h1>Match nul</h1>
      )
    }
  }

  testAlreadyPlayedCell(rowName, columnIndex){
    if(this.state.game[rowName][columnIndex] !== "_"){
      return true;
    }
    return false;
  }

  handleInput = (rowName, columnIndex) => {
    const newBoard = this.state.game;

    if(this.testAlreadyPlayedCell(rowName, columnIndex)){
      return;
    }
    newBoard[rowName][columnIndex] = this.state.player;

    Object.keys(this.state.game).forEach(row => {
      if(this.testVictoryLine(this.state.game[row])){
        this.setState({
          game: this.state.game,
          player: this.state.player,
          victoryEnd: true
        });
      }
    });

    [0,1,2].forEach(column => {
      if(this.testVictoryColumn(column)) {
        this.setState({
          game: this.state.game,
          player: this.state.player,
          victoryEnd: true
        });
      }
    });

    if(this.testVictoryDiagonale()){
      this.setState({
        game: this.state.game,
        player: this.state.player,
        victoryEnd: true
      });
    }

    if (!this.state.game.row1.concat(this.state.game.row2).concat(this.state.game.row3).includes("_")){
      this.setState({
        game: this.state.game,
        player: this.state.player,
        drawEnd: true
      });
    }

    if(this.state.player === "X"){
      this.setState({
        game: newBoard,
        player: "O"
      });
    } else {
      this.setState({
        game: newBoard,
        player: "X"
      });
    }
  }

  reload(){
    this.setState({
      game: init(),
      player: "X",
      victoryEnd: false,
      drawEnd: false
    })
    console.log(init)
  }

  render() {
    return (
      <div className="App jumbotron">
        <nav className="navbar fixed-top navbar-dark bg-dark">
          <span className="App-title navbar-brand mb-0 h1">Tic Tac Toe</span>
          <span><button className="btn btn-success" onClick={() => {this.reload()}}>Recommencer</button></span>
      </nav>
          <table>
            <GameBoard board={this.state.game} handleInput={this.handleInput}/>
          </table>
          {this.end()}
      </div>
    );
  }
}

export default App;
