import React, { Component } from 'react';
import  Board  from './Board';
import SpeedController from './SpeedController';
import myBoard from './myBoard';
import GridColorOptions from './GridColor';
import ChangeBoard from './ChangeBoard';

import './App.css';

// define a global variable
// const screenRows = 75;
// const screenCols = 75;
// seeding: 10% of grid gets 'alive' state
const cell = () => Math.random() < 0.1;


class App extends Component{
  state = {
    boardStatus: myBoard(cell, 100, 100),
    dimension: {
      width: 100,
      length: 100
    },
    generation: 0,
    onRunning: false,
    speed: 300,
    gridColor: 'black'
  }



  stopOrStart = () => {
    return this.state.onRunning ? 
      <button type='button' onClick={() => this.setState({onRunning: false})}>Stop</button> :
      <button type='button' onClick={() => this.setState({onRunning: true})}>Start</button>
  }

  // clear all board
  Clearboard = () => {
    this.setState({
      boardStatus: myBoard(false, this.state.dimension.width, this.state.dimension.length),
      generation: 0
    }) 
  }

  // reset the board to initial state
  resetBoard = () => {
    this.setState({
      boardStatus: myBoard(cell,100, 100),
      dimension: {
        width: 100,
        length: 100
      },
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

    const { width, length } = this.state.dimension;
    const regeneration = (boardState) => {
      const boardStatus = boardState.boardStatus;
      const copyOfBoardStatus = JSON.parse(JSON.stringify(boardStatus));

      const numberOfLiveNeighbors = (row, col) => {
        const neighbors = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

        return neighbors.reduce((accum, neighbor) => {
            const x = row + neighbor[0];
            const y = col + neighbor[1];
            const isInBoard = (x >= 0 && x < width && y >= 0 && y < length)
            if (isInBoard && boardStatus[x][y])
              return accum + 1
            else
              return accum
        }, 0)
      }

      for (let row = 0; row < width; row++) {
        for (let col = 0; col < length; col++) {
          const numLives = numberOfLiveNeighbors(row, col);
           console.log('copyofboardstatus',boardStatus[row][col], numberOfLiveNeighbors(row, col) )
           if (!boardStatus[row][col]){
               if (numLives === 3) 
                 copyOfBoardStatus[row][col] = true;
          }
            
          else {
            if (numLives < 2 || numLives > 3)
            copyOfBoardStatus[row][col] = false
           }
          
            
         

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

  colorChange = (newColor) => {
    this.setState({
      gridColor: newColor
    })
  };

  dimensionChange = (dim) => {
    
    this.setState({
      
      boardStatus: myBoard(cell, dim.width, dim.length),
      dimension: dim
       
    });
  
  }

  componentDidUpdate(pProps, pState){
    const {onRunning, speed} = this.state;

    const gameStarted = !pState.onRunning && onRunning;
    const gameStopped = pState.onRunning && !onRunning;
   

    if (gameStopped)
      clearInterval(this.myTimer)

      if  (gameStarted) {
      this.myTimer = setInterval(() => {
        this.handleRegenration()
      }, speed)
    }

  }

  render(){

    const { boardStatus, generation, onRunning, speed, gridColor } = this.state;
    const { width, length } = this.state.dimension;
    return (
    <div className="App">
      <h1>Game of Life</h1>
      <Board className ='board' boardStatus={boardStatus} toggleCellStatus={this.toggleCellContent} color={gridColor} width={width}  length={length} />
      <div className='controls upper'>
        <span className='gen'>
          {'+  '}
          <SpeedController speed={speed} speedChange={this.handleSpeed} />
          {'  -'}
        </span>
          <span>speed: {1100 - speed} </span>
          <span className='gen'> {`Generation: ${generation}`}</span>
        <div className='dim-control'>
          <GridColorOptions colorChange = {this.colorChange} />
          <span className='dim-span'>Current Dimension: {width} X {length}</span>
        </div>
          <ChangeBoard dimensionChange={this.dimensionChange} />
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

export { App };
