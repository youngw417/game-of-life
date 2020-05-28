import React from 'react'

export default ({dimension, dimensionChange}) => {
    const { width, length } = dimension;

    const handleChange = (e) => {
        dimensionChange(e.target.value)
    };

    return (
        <div className='dimension'>
            <label>Enter Board Width</label>
            <input type = 'text' name="width" value={width} onChange={handleChange} />
            <label>Enter Board Length</label>
            <input type = 'text' name="width" value={length} onChange={handleChange} />
        </div>
       
    )
}
