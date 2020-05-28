
import {screenRows, screenCols} from './App';
// initializing the board with ramdom input or clear all values
export default (cellStatus) => {
    const board = [];
    for (let i = 0; i < screenRows; i++ ){
      board[i] = [];
      for (let j = 0; j < screenCols; j++){
        board[i][j] = cellStatus ? cellStatus() : false;
      }
    }
    return board;
  }