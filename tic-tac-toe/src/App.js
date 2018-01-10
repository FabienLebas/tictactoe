import React, { Component } from 'react';
import logo from './logo.svg';
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
        <h1>Victoire !</h1>
      )
    } else if (this.state.drawEnd){
      return (
        <h1>Match nul</h1>
      )
    }
  }

  handleInput = (rowName, columnIndex) => {
    const newBoard = this.state.game;
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
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Tic Tac Toe</h1>
        </header>
        <table>
          <GameBoard board={this.state.game} handleInput={this.handleInput}/>
        </table>
        {this.end()}
        <button onClick={() => {this.reload()}}>Recommencer</button>
      </div>
    );
  }
}

export default App;
