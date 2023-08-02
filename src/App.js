import { useState, useEffect } from 'react';
import axios from "axios";
import searchIcon from './images/search.svg';
import waterIcon from './images/water.svg';
import sunIcon from './images/sun.svg';
import locationIcon from './images/location.svg';
import Day from './Day';
import Today from './Today';
import './App.css';
import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";


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
  const [dateTime, setdateTime] = useState(null)

  function convertEpochToCustomFormat(epochTime) {
    const epochTimeMs = epochTime * 1000;
    const dateObject = new Date(epochTimeMs);
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const weekdayName = weekdays[dateObject.getDay()];
    const hours = dateObject.getHours() % 12 || 12; // Convert 0 to 12
    const minutes = String(dateObject.getMinutes()).padStart(2, "0");
    const amOrPm = dateObject.getHours() < 12 ? "AM" : "PM";
    const formattedTime = `${weekdayName}, ${hours} : ${minutes} ${amOrPm}`;
    return formattedTime;
  }

  function getDayNameFromEpoch(epochTime) {
    const epochTimeMs = epochTime * 1000;
    const dateObject = new Date(epochTimeMs);
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayName = weekdays[dateObject.getDay()];
    return dayName;
  }

  function convertTo12HourFormat(timeString) {
    const [hour, minute] = timeString.split(':');
    const numericHour = parseInt(hour, 10);
    const amOrPm = numericHour >= 12 ? 'PM' : 'AM';
    const twelveHour = numericHour % 12 || 12;
    const formattedTime = `${twelveHour}:${minute} ${amOrPm}`;
    return formattedTime;
  }


  function fahrenheitToCelsius(fahrenheit) {
    let celsius = (fahrenheit - 32) * 5 / 9;
    return celsius.toFixed(1);
  }

  const MeasureUvIndex = (e) => (e <= 2 ? 'Low' : e <= 5 ? 'Moderate' : e <= 7 ? 'High' : e <= 10 ? 'Very High 😰' : 'Extreme 🥵');

  const getAirQualityStatus = (e) => {
    let t = '';
    return (t =
      e >= 0 && e <= 50
        ? 'Good'
        : e >= 51 && e <= 100
        ? 'Moderate'
        : e >= 101 && e <= 150
        ? 'Unhealthy for Sensitive Groups '
        : e >= 151 && e <= 200
        ? 'Unhealthy '
        : e >= 201 && e <= 300
        ? 'Very Unhealthy '
        : e >= 301
        ? 'Hazardous '
        : 'Invalid AQI value.',
      t);
  };

  const getHumidityStatus = (e) => (e <= 30 ? 'Low' : e <= 60 ? 'Moderate' : 'High');
  const getVisibilityStatus = (e) =>
    e <= 0.03
      ? 'Dense Fog'
      : e <= 0.16
      ? 'Moderate Fog'
      : e <= 0.35
      ? 'Light Fog'
      : e <= 1.13
      ? 'Very Light Fog'
      : e <= 2.16
      ? 'Light Mist'
      : e <= 5.4
      ? 'Very Light Mist'
      : e <= 10.8
      ? 'Clear Air'
      : 'Very Clear Air';


  function convertToCustomFormat(inputDateTime) {
    const weekdays = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ];
  
    const inputDate = new Date(inputDateTime);
    const dayOfWeek = weekdays[inputDate.getDay()];
  
    const hours = inputDate.getHours() % 12 || 12;
    const minutes = String(inputDate.getMinutes()).padStart(2, '0');
    const amOrPm = inputDate.getHours() < 12 ? 'AM' : 'PM';
  
    const formattedHours = String(hours).padStart(2, '0');
    const formattedDateTime = `${dayOfWeek}, ${formattedHours} : ${minutes} ${amOrPm}`;
    return formattedDateTime;
  }
  
  const inputDateTime = '2023-08-02 16:03';
  const formattedDateTime = convertToCustomFormat(inputDateTime);
  console.log(formattedDateTime); // Output: "Tuesday, 04 : 03 PM"
  


  useEffect(() => {
    axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=AHNRLT6ZY7KFVZJGATSZFEM6V&contentType=json`)
      .then(response => {
        console.log(response.data);
        setData(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  axios.get(`http://api.weatherapi.com/v1/current.json?key=4694837bde1b4b238a2111657231407&q=${location}&aqi=no`)
  .then(response => {
    console.log(response.data);
    setdateTime(response.data.location.localtime)
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
              <img className="weatherimage" src={getIcon(data.currentConditions.icon)} alt="Weather Icon " height={40} width={40} />
            </div>
            <div className='temp-date'>
              <h1 className='temp'>{fahrenheitToCelsius(data.currentConditions.temp)}<sup className='celcius'>°C</sup></h1>
              <p className='date' > {convertToCustomFormat(dateTime)||convertEpochToCustomFormat(data.currentConditions.datetimeEpoch)} </p>
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
                <p className='water-details'>Perc - {data.currentConditions.precip}% </p>
              </div>
              <div className='sunimage'>
                <img src={sunIcon} alt="Sun Icon " height={18} width={18} />
                <p className='sun-details'>{fahrenheitToCelsius(data.currentConditions.temp)}<sup> °C</sup></p>
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
            }} className='week' style={{ color: weatherScope === "Week" ? "#32f7f7f9" : "white" }}> Week</p>
            <p style={{ color: weatherScope === "Today" ? "#32f7f7f9" : "white" }} onClick={() => {
              setWeatherScope("Today")
            }}
              className='today' > Today </p>
          </div>
          {
            weatherScope === "Week" ? <div className='week-details'>
              {data.days.slice(0, 7).map((day, index) => {

                return <motion.div key={uuidv4()}
                  initial={{ opacity: 0, translateX: -80 }}
                  animate={{ opacity: 1, translateX: 0 }}
                  transition={{ duration: 0.9, delay: index * 0.08 }}
                >
                  <Day day={getDayNameFromEpoch(day.datetimeEpoch)} img={getIcon(day.icon)} temp={fahrenheitToCelsius(day.temp)}></Day>
                </motion.div>
              })}
            </div> : <div className='today-details'>
              {data.days[0].hours.map((hour, index) => {
                return <motion.div key={uuidv4()}
                  initial={{ opacity: 0, translateX: -80 }}
                  animate={{ opacity: 1, translateX: 0 }}
                  transition={{ duration: 0.9, delay: index * 0.08 }}
                >
                  <Day day={convertTo12HourFormat(hour.datetime)} img={getIcon(hour.icon)} temp={fahrenheitToCelsius(hour.temp)}></Day>

                </motion.div >
              })}
            </div>
          }
          <p className='todays-highlights-text'>Today's Highlights</p>
          <div className='today-highlights'>
            <Today startValue={'UV Index'} middleValue={data.currentConditions.uvindex} endValue={MeasureUvIndex(data.currentConditions.uvindex)} ></Today>
            <Today startValue={'Wind Speed'} middleValue={data.currentConditions.windspeed} endValue={'km/h'} ></Today>
            <Today startValue={'Sunrise & Sunset'} middleValue={convertTo12HourFormat(data.currentConditions.sunrise)} endValue={convertTo12HourFormat(data.currentConditions.sunset)} ></Today>
            <Today startValue={'Humidity'} middleValue={(data.currentConditions.humidity + "%")} endValue={getHumidityStatus(data.currentConditions.humidity)} ></Today>
            <Today startValue={'Visibility'} middleValue={data.currentConditions.visibility} endValue={getVisibilityStatus(data.currentConditions.visibility)} ></Today>
            <Today startValue={'Air Quality'} middleValue={data.currentConditions.winddir} endValue={getAirQualityStatus(data.currentConditions.winddir)} ></Today>
          </div>
        </div>
      </div>
      : null}
    </>
  );
}
export default App;
