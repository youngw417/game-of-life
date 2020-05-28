import React, { useState } from 'react'

export default ({dimensionChange}) => {
    const [dim, setDim] = useState({
        width: 100,
        length: 100
    })

    const handleChange = (e) => {
        e.preventDefault();
        setDim({
            ...dim,
            [e.target.name]: parseInt(e.target.value)});
       
    };

    const onSubmit = (e) => {
        console.log('dim', dim)
        e.preventDefault();
        dimensionChange(dim)
        setDim({
            width: 100,
            length: 100
        })

   
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
