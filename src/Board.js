import React from 'react'
// import { screenRows, screenCols } from './App';


export default ({ boardStatus, toggleCellStatus, color, width, length}) => {

    const handleClick = (row, col) => toggleCellStatus(row, col)
    const randomColor = () => '#'+Math.floor(Math.random()*16777215).toString(16);
    const setColor = (color) => {
        if (color === 'random')
            return randomColor();
        return color
    }
    console.log('boardStatus', boardStatus);
    const rows = [];
    for (let row  = 0; row < width; row++){
        const cols = [];
        for (let col = 0; col < length; col++){

            cols.push(
                <td 
                key = {`${row}-${col}`}
               
                // className={boardStatus[row][col] ? 'alive' : ' dead'}
                style={{ backgroundColor: boardStatus[row][col] && setColor(color)}}
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

