import React from 'react'

const Countries = ({ countries }) => {
  if (countries.length > 1 && countries.length < 11 ) {
    return (
      <ul>
        {countries.map(country =>
          <li key={country.name}>{country.name}</li>
        )}
      </ul>
    )
  }

  if (countries.length === 1) {
    return (
      <div>
        {countries.map(country =>
          <Country key={country.name} country={country} />
        )}
      </div>
    )
  }

  return (
    <p>Too many countries, specify another filter</p>
  );
}

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <h4>Languages</h4>
      <ul>
        {country.languages.map(language =>
          <li key={language.name}>{language.name}</li>
        )}
      </ul>
      <img src={country.flag} alt={`Flag of ${country.name}`} />
    </div>
  )
}

export default Countries;