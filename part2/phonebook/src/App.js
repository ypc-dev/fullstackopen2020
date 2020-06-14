import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ nameFilter, setNameFilter ] = useState('');
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(nameFilter));

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} has already been added to the phonebook!`);
      setNewName('');
      setNewNumber('');
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }

      axios
        .post('http://localhost:3001/persons', personObject)
        .then(response => {
          setPersons(persons.concat(personObject));
          setNewName('');
          setNewNumber('');
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value.toLowerCase());
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={nameFilter} onChange={handleNameFilterChange} />
      <h3>Add a new</h3>
      <PersonForm onSubmit={addPerson} 
                  nameValue={newName} 
                  nameOnChange={handleNameChange} 
                  numberValue={newNumber} 
                  numberOnChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App;