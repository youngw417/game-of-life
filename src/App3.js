import React, { useState, useEffect, useCallback, useRef } from 'react';
import  Board  from './Board';
import SpeedController from './SpeedController';
import myBoard from './myBoard';

import './App.css';

// define a global variable
const screenRows = 75;
const screenCols = 75;
// seeding: 10% of grid gets 'alive' state
const cell = () => Math.random() < 0.1


function App (){

  const [board, setBoard] = useState({
    boardStatus: myBoard(cell),
    generation: 0,
    onRunning: false,
    speed: 300
  }) 

  

  const stopOrStart = () => {
    return board.onRunning ? 
      <button type='button' onClick={() => setBoard({onRunning: false})}>Stop</button> :
      <button type='button' onClick={() => setBoard({onRunning: true})}>Start</button>
  }

  // clear all board
  const clearboard = () => {
    setBoard({
      boardStatus: myBoard(false),
      generation: 0
    }) 
  }

  // reset the board to initial state
  const resetBoard = () => {
    setBoard({
      boardStatus: myBoard(cell),
      generation: 0
    })
  }

  // toggle board state by user
 
 const toggleCellContent = (row, col) => {

      const newBoardStatus = (boardState) => {
        // deep cloning
         const copyOfBoardStatus = JSON.parse(JSON.stringify(boardState.boardStatus));
         copyOfBoardStatus[row][col] = !copyOfBoardStatus[row][col];
         return copyOfBoardStatus;
      }

      setBoard( boardState => {
       return { boardStatus: newBoardStatus(boardState)}
      }
      )
  }



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

  // const regeneratedStatus = regeneration(board)

  const handleRegeneration = () => {
    setBoard({
      boardStatus: regeneration(board),
      generation: board.generation + 1
    })
  }
    

  const handleSpeed = newSpeed => {
    setBoard({
      speed: newSpeed
    })
  }

  // const handleOnRunning = () => {
  //   setBoard({
  //     onRunning: true
  //   })
  // }

  // const handleStop = () => {
  //   setBoard({
  //     onRunning: false
  //   })
  // }

  // componentDidMount(){
  //   M.AutoInit()
  // }

  // componentDidUpdate(pProps, pState){
  //   const {onRunning, speed} = this.state;
  //   const speedChanged = pState.speed !== speed;
  //   const gameStarted = !pState.onRunning && onRunning;
  //   const gameStopped = pState.onRunning && !onRunning;
   
  //   if ((onRunning && speedChanged) || gameStopped)
  //     clearInterval(this.myTimer)

  //   if  ((onRunning && speedChanged) || gameStarted) {
  //     this.myTimer = setInterval(() => {
  //       this.handleRegenration()
  //     }, speed)
  //   }

  // }

  const refState = useRef()
  
  const { onRunning, speed } = board;
  useEffect(() => {
  
    refState.current = board;
    const pState = refState;

    const speedChanged = pState.speed !== speed;
    const gameStarted = !pState.onRunning && onRunning;
    const gameStopped = pState.onRunning && !onRunning;
    let myTimer = null;

    if ((onRunning && speedChanged) || gameStopped)
     myTimer = setInterval(() => {
     
          handleRegeneration()
      }, speed);
   
      if  ((onRunning && speedChanged) || gameStarted) {
        myTimer = setInterval(() => {
          handleRegeneration()
        }, speed)
      }
    

  }, [ handleRegeneration, board, onRunning, speed ])

 
    const { boardStatus, generation } = board;

    return (
    <div className="App">
      <h1>Game of Life</h1>
      <Board className ='board' boardStatus={boardStatus} toggleCellStatus={toggleCellContent} />
      <div className='controls upper'>
        <span className='gen'>
          {'+  '}
          <SpeedController speed={speed} speedChange={handleSpeed} />
          {'  -'}
        </span>
          <span className='gen'> {`Generation: ${generation}`}</span>
      </div>
      <div className='controls lower'>
        {stopOrStart()}
        <button type='button' disabled={onRunning} onClick={handleRegeneration} >Step</button>
        <button type='button' onClick={clearboard} >Clear Board</button>
        <button type='button' onClick={resetBoard} >New Board</button>

      </div>
      
    </div>
  );



  
}

export { App, screenRows, screenCols };