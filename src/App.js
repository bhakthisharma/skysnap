import {useState} from 'react';
import searchIcon from './images/search.svg';
import weatherIcon from './images/weather.png';
import cloudIcon from './images/cloud.svg';
import waterIcon from './images/water.svg';
import sunIcon from './images/sun.svg';
import locationIcon from './images/location.svg';


import './App.css';
function App() {
  return (
    <div className="container" >

      
      <div className="section-1">
        <div className='top-section'>
        <div className='search-container'>
        <input type="text" name='query' placeholder='Search...' />
        <img className='searchimage' src={searchIcon} alt="Search Icon " height={30} width={30} />
        
        </div>

      <div className="weatherImage">
        <img className="weatherimage" src={weatherIcon} alt="Weather Icon " height={40} width={40} />
        
        </div>
        <div className='temp-date'>
        <h1 className='temp'>30.9<sup className='celcius'>°C</sup></h1>
        <p className='date'>Friday, 16:12PM</p>
        </div>
      </div>


      <div className='bottom-section'>
        <div className='details'>


      <div className='cloudimage' >
      <img  src={cloudIcon} alt="Cloud Icon " height={18} width={18} />
      <p className='cloud-details'>Partially cloudy</p>
      </div>

      <div className='waterimage'>
      <img  src={waterIcon} alt="Water Icon " height={18} width={18} />
      <p className='water-details'>Misty</p>
      </div>

      <div className='sunimage'>
      <img  src={sunIcon} alt="Sun Icon " height={18} width={18} />
      <p className='sun-details'>21 °C</p>
      </div>

      
      </div>
      <div className='locationimage'>
      <img  src={locationIcon} alt="Location Icon " height={18} width={18} />
      <p  className='location-details'>Manchi,    Kundamkuzhy</p>
      </div>
      </div>
      </div>

      <div className="section-2">
      <div className='title'>
        <p className='today'> Today </p>
        <p className='week'> Week</p>

</div>
      </div>

      </div>
    
  );
}

export default App;
