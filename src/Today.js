import React from 'react'

const Today = ({startValue, middleValue, endValue}) => {
  return (
    <div className='today-card'>
    <p className='start-value'> {startValue}</p>
    <p className='middle-value'> {middleValue} </p>
    <p className='end-value'>  {endValue}</p>
    
    </div>

  )
}

export default Today 

// rafce