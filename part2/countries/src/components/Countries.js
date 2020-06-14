import React, { useState, useEffect } from 'react'
import axios from 'axios';

const Countries = ({ countries }) => {
  return (
    <div>
      {countries.map(country =>
        <Country key={country.name} country={country} />
      )}
    </div>
  )
}

const Country = ({ country }) => {
  const weather_api_key = process.env.REACT_APP_WEATHER_API_KEY;
  const [showInfo, setShowInfo] = useState(false);
  const [currentWeatherInfo, setCurrentWeatherInfo] = useState({});

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${weather_api_key}&units=metric`)
      .then(response => {
        setCurrentWeatherInfo(response.data);
      });
  }, []);

  if (showInfo) {
    return (
      <div>
        <p><strong><u>{country.name}</u></strong> <button onClick={() => setShowInfo(false)}>show</button></p>
        <p>Capital: {country.capital}</p>
        <p>Languages: </p>
        <ul>
          {country.languages.map(language =>
            <li key={language.name}>{language.name}</li>
          )}
        </ul>
        <p><strong>Weather in {country.capital}</strong></p>
        <p>Temperature: {currentWeatherInfo.main.temp} Celsuis</p>
        <p>Description: {currentWeatherInfo.weather[0].description} </p>
        <img src={country.flag} alt={`Flag of ${country.name}`} />
        <br />
      </div>
    )
  }

  return (
    <div>
      <p>{country.name} <button onClick={() => setShowInfo(true)}>show</button></p>
    </div>
  )
}

export default Countries;