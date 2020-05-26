import React, { Component } from 'react';
import { Board } from './Board';
import SpeedController from './SpeedController';
import myBoard from './myBoard';
// import 'materialize-css/dist/css/materialize.min.css'
// import M from 'materialize-css/dist/js/materialize.min.js'
import './App.css';

// define a global variable
const screenRows = 75;
const screenCols = 75;
const cell = () => Math.random() < 0.1


class App extends Component{
  state = {
    boardStatus: myBoard(cell),
    generation: 0,
    onRunning: false,
    speed: 300
  }

  

  stopOrStart = () => {
    return this.state.onRunning ? 
      <button type='button' onClick={() => this.setState({onRunning: false})}>Stop</button> :
      <button type='button' onClick={() => this.setState({onRunning: true})}>Start</button>
  }

  // clear all board
  Clearboard = () => {
    this.setState({
      boardStatus: myBoard(false),
      generation: 0
    }) 
  }

  // reset the board to initial state
  resetBoard = () => {
    this.setState({
      boardStatus: myBoard(cell),
      generation: 0
    })
  }

  // toggle board state by user
 

  toggleCellContent = (row, col) => {

      const newBoardStatus = (boardState) => {
        // deep cloning
         const copyOfBoardStatus = JSON.parse(JSON.stringify(boardState.boardStatus));
         copyOfBoardStatus[row][col] = !copyOfBoardStatus[row][col];
         return copyOfBoardStatus;
      }

      this.setState( boardState => {
       return { boardStatus: newBoardStatus(boardState)}
      }
      )
  }

  handleRegenration = () => {

    const regeneration = (boardState) => {
      const boardStatus = boardState.boardStatus;
      const copyOfBoardStatus = JSON.parse(JSON.stringify(boardStatus));

      const numberOfLiveNeighbors = (row, col) => {
        const neighbors = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

        return neighbors.reduce((accum, neighbor) => {
            const x = row + neighbor[0];
            const y = col + neighbor[1]
            const isInBoard = (x >= 0 && x < screenRows && y>= 0 && y < screenCols)
            if (accum < 4 && isInBoard && copyOfBoardStatus[x][y])
              return accum + 1
            else
              return accum
        }, 0)
      }

      for (let row = 0; row < screenRows; row++) {
        for (let col = 0; col < screenCols; col++) {
          const numLives = numberOfLiveNeighbors(row, col);
          if (numLives === 3 && !boardStatus[row][col])
            copyOfBoardStatus[row][col] = true
          else if ((numLives < 2 || numLives > 3) && boardStatus[row][col])
            copyOfBoardStatus[row][col] = false

        }
     }

     return copyOfBoardStatus;
    }

    this.setState(boardState => ({
      boardStatus: regeneration(boardState),
      generation: boardState.generation + 1
    })
    )
    
  }

  handleSpeed = newSpeed => {
    this.setState({
      speed: newSpeed
    })
  }

  handleOnRunning = () => {
    this.setState({
      onRunning: true
    })
  }

  handleStop = () => {
    this.setState({
      onRunning: false
    })
  }

  // componentDidMount(){
  //   M.AutoInit()
  // }
  componentDidUpdate(pProps, pState){
    const {onRunning, speed} = this.state;
    const speedChanged = pState.speed !== speed;
    const gameStarted = !pState.onRunning && onRunning;
    const gameStopped = pState.onRunning && !onRunning;
   
    if ((onRunning && speedChanged) || gameStopped)
      clearInterval(this.myTimer)

    if  ((onRunning && speedChanged) || gameStarted) {
      this.myTimer = setInterval(() => {
        this.handleRegenration()
      }, speed)
    }

  }

  render(){

    const { boardStatus, generation, onRunning, speed } = this.state;

    return (
    <div className="App">
      <h1>Game of Life</h1>
      <Board className ='board' boardStatus={boardStatus} toggleCellStatus={this.toggleCellContent} />
      <div className='controls upper'>
        <span className='gen'>
          {'+  '}
          <SpeedController speed={speed} speedChange={this.handleSpeed} />
          {'  -'}
        </span>
          <span className='gen'> {`Generation: ${generation}`}</span>
      </div>
      <div className='controls lower'>
        {this.stopOrStart()}
        <button type='button' disabled={onRunning} onClick={this.handleRegenration} >Step</button>
        <button type='button' onClick={this.Clearboard} >Clear Board</button>
        <button type='button' onClick={this.resetBoard} >New Board</button>

      </div>
      
    </div>
  );


  }
  
}

export { App, screenRows, screenCols };
