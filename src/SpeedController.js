import React from 'react'

const SpeedController = ({ speed, speedChange}) => {

    const handleChange = (e) => {
        speedChange(e.target.value)
    }
    return (
        <input
            type='range'
            min ='100'
            max = '1000'
            step = '100'
            value = {speed}
            onChange = {handleChange}
        />
    )
}

export default SpeedController;
