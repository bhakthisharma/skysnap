import React from 'react'

const Day = ({day, img, temp}) => {
  return (
    <div className='tuesday'>
    <p>{day}</p>
    <img src= {img} alt="" height={35} width={35} />
    <p> {temp} <sup className='weeks-celcius'>°C</sup></p>
    </div>

  )
}

export default Day