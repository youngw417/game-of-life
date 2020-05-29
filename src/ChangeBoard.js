import React, { useState } from 'react'

const initialState = {
    width: 75,
    length: 75
}
export default ({dimensionChange}) => {
    const [dim, setDim] = useState(initialState)

    const handleChange = (e) => {
        e.preventDefault();
        setDim({
            ...dim,
            [e.target.name]: parseInt(e.target.value)});
       
    };

    const onSubmit = (e) => {
        console.log('dim', dim)
        e.preventDefault();
        dimensionChange(dim);
        setDim(initialState);

   
    }

    return (
        <div className='dimension'>
            <form>
                <label id ='width'>Enter Board Width</label>
                <input type = 'number' name="width" value={dim.width} onChange={handleChange} />
                <label id='length'>Enter Board Length</label>
                <input type = 'number' name="length" value={dim.length} onChange={handleChange} />
                <button onClick={onSubmit}>Submit</button>
            </form>
            
        </div>
       
    )
}
