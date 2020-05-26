
import {screenRows, screenCols} from './App';

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