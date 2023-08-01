import { useState, useEffect } from 'react';
import axios from "axios";
import searchIcon from './images/search.svg';
import weatherIcon from './images/weather.png';
import cloudIcon from './images/cloud.svg';
import waterIcon from './images/water.svg';
import sunIcon from './images/sun.svg';
import locationIcon from './images/location.svg';
import Day from './Day';
import Today from './Today';
import './App.css';


function App() {
  const getIcon = e => {
    switch (e) {
      case "partly-cloudy-day":
        return "https://i.ibb.co/PZQXH8V/27.png";
      case "partly-cloudy-night":
        return "https://i.ibb.co/Kzkk59k/15.png";
      case "rain":
        return "https://i.ibb.co/kBd2NTS/39.png";
      case "clear-day":
      default:
        return "https://i.ibb.co/rb4rrJL/26.png";
      case "clear-night":
        return "https://i.ibb.co/1nxNGHL/10.png"
    }
  }



  const [data, setData] = useState(null)
  const [location, setLocation] = useState("Puttur")
  const [weatherScope, setWeatherScope] = useState("Week")

  function convertEpochToCustomFormat(epochTime) {
    // Convert epoch time to milliseconds
    const epochTimeMs = epochTime * 1000;

    // Create a new Date object using the epoch time
    const dateObject = new Date(epochTimeMs);

    // Create an array of weekday names
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    // Get the weekday name (0 = Sunday, 1 = Monday, etc.)
    const weekdayName = weekdays[dateObject.getDay()];

    // Get the hour (12-hour format), minute, and AM/PM
    const hours = dateObject.getHours() % 12 || 12; // Convert 0 to 12
    const minutes = String(dateObject.getMinutes()).padStart(2, "0");
    const amOrPm = dateObject.getHours() < 12 ? "AM" : "PM";

    // Format the final string
    const formattedTime = `${weekdayName}, ${hours} : ${minutes} ${amOrPm}`;

    return formattedTime;
  }

  function getDayNameFromEpoch(epochTime) {
    // Convert epoch time to milliseconds
    const epochTimeMs = epochTime * 1000;

    // Create a new Date object using the epoch time
    const dateObject = new Date(epochTimeMs);

    // Create an array of weekday names
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    // Get the weekday name (0 = Sunday, 1 = Monday, etc.)
    const dayName = weekdays[dateObject.getDay()];

    return dayName;
  }

  // Example usage:
  const epochTime = 1690889220;
  const dayName = getDayNameFromEpoch(epochTime);
  console.log(dayName);

  function convertTo12HourFormat(timeString) {
    // Extract hour, minute, and second from the time string
    const [hour, minute] = timeString.split(':');
  
    // Convert hour to a number
    const numericHour = parseInt(hour, 10);
  
    // Determine AM or PM based on the hour
    const amOrPm = numericHour >= 12 ? 'PM' : 'AM';
  
    // Calculate the 12-hour format hour
    const twelveHour = numericHour % 12 || 12;
  
    // Format the final string
    const formattedTime = `${twelveHour}:${minute} ${amOrPm}`;
  
    return formattedTime;
  }
  
  





  useEffect(() => {
    axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=AHNRLT6ZY7KFVZJGATSZFEM6V&contentType=json`)

      .then(response => {
        console.log(response.data);
        setData(response.data)
      })
      .catch(error => {
        console.error(error);
      });


  }, [location]);


  return (
    <> {data ?
      <div className="container" >


        <div className="section-1">
          <div className='top-section'>
            <div className='search-container'>
              <input onChange={(e) => setLocation(e.target.value)} type="text" name='query' placeholder='Search...' />
              <img className='searchimage' src={searchIcon} alt="Search Icon " height={39} width={39} />

            </div>

            <div className="weatherImage">
              <img className="weatherimage" src={getIcon(data.e)} alt="Weather Icon " height={40} width={40} />
            </div>
            <div className='temp-date'>
              <h1 className='temp'>{data.currentConditions.temp}<sup className='celcius'>°C</sup></h1>
              <p className='date' > {convertEpochToCustomFormat(data.currentConditions.datetimeEpoch)} </p>

            </div>
          </div>


          <div className='bottom-section'>
            <div className='details'>


              <div className='cloudimage' >
                <img src={getIcon(data.currentConditions.icon)} alt="Cloud Icon " height={18} width={18} />
                <p className='cloud-details'>{data.currentConditions.conditions}</p>
              </div>

              <div className='waterimage'>
                <img src={waterIcon} alt="Water Icon " height={18} width={18} />
                <p className='water-details'>{data.currentConditions.precip}</p>
              </div>

              <div className='sunimage'>
                <img src={sunIcon} alt="Sun Icon " height={18} width={18} />
                <p className='sun-details'>{data.currentConditions.temp}<sup> °C</sup></p>
              </div>


            </div>
            <div className='locationimage'>
              <img src={locationIcon} alt="Location Icon " height={18} width={18} />
              <p className='location-details'>{data.resolvedAddress}</p>
            </div>
          </div>
        </div>

        <div className="section-2">
          <div className='title'>
            <p onClick={() => {
              setWeatherScope("Week")
            }} className='week'> Week</p>
            <p onClick={() => {
              setWeatherScope("Today")
            }}
              className='today'> Today </p>
          </div>
          {
            weatherScope === "Week" ? <div className='week-details'>
              {data.days.slice(0, 7).map((day) => {

                return <Day day={getDayNameFromEpoch(day.datetimeEpoch)} img={getIcon(day.icon)} temp={day.temp}></Day>

              })}

            </div> : <div className='today-details'>
              {data.days[0].hours.map((hour) => {

                return <Day day={convertTo12HourFormat(hour.datetime)} img={getIcon(hour.icon)} temp={hour.temp}></Day>

              })}

            </div>
          }

          <p className='todays-highlights-text'>Today's Highlights</p>

          <div className='today-highlights'>
            <Today startValue={'UV Index'} middleValue={'3'} endValue={'moderate'} ></Today>
            <Today startValue={'UV Index'} middleValue={'3'} endValue={'moderate'} ></Today>
            <Today startValue={'UV Index'} middleValue={'3'} endValue={'moderate'} ></Today>
            <Today startValue={'UV Index'} middleValue={'3'} endValue={'moderate'} ></Today>
            <Today startValue={'UV Index'} middleValue={'3'} endValue={'moderate'} ></Today>
            <Today startValue={'UV Index'} middleValue={'3'} endValue={'moderate'} ></Today>


          </div>
        </div>


      </div>
      : null}
    </>





  );
}

export default App;
