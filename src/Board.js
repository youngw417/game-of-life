import React from 'react'
import { screenRows, screenCols } from './App';

export const Board = ({ boardStatus, toggleCellStatus}) => {

    const handleClick = (row, col) => toggleCellStatus(row, col)
    
    const rows = [];
    for (let row  = 0; row < screenRows; row++){
        const cols = [];
        for (let col = 0; col < screenCols; col++){
            cols.push(
                <td 
                key = {`${row}-${col}`}
                className={boardStatus[row][col] ? 'alive' : ' dead'}
                onClick = {() => handleClick(row, col)}
                />
                )
        }

        rows.push(
            <tr key={row}>{cols}</tr>
        )
    }


    return (
             <table className='container'>
                <tbody>
                    {rows}
                </tbody>
             </table>
       
       
    )
}

