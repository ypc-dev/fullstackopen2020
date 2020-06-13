import React, { useState } from 'react'

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
  const [showInfo, setShowInfo] = useState(false);

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