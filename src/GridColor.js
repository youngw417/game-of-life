import React from 'react'

export default ({colorChange}) => {

    const handleChange = (e) => {
        colorChange(e.target.value)
    };

    return (
        <div className='option'>
            <label>Grid Color</label>
            <select name="color" id="color" onChange={handleChange}>
            
            <option value="black">Black</option>
            <option value="random">Random Colors</option>
            <option value="red">Red</option>
            <option value="green">Green</option>
            </select>
        </div>
       
    )
}

