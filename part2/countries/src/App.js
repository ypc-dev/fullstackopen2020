import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Countries from './components/Countries';
import Filter from './components/Filter';

function App() {
  const [countries, setCountries] = useState([]);
  const [countriesFilter, setCountriesFilter] = useState('');
  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(countriesFilter));

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data);
      });
  }, []);

  const handleCountriesFilterChange = (event) => {
    setCountriesFilter(event.target.value.toLowerCase());
  }

  return (
    <div>
      <Filter value={countriesFilter} onChange={handleCountriesFilterChange} />
      <Countries countries={filteredCountries} />
    </div>
  );
}

export default App;
