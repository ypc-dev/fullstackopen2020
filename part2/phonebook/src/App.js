import React, { useState } from 'react';
import Person from './components/Person';

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]);
  const [ newName, setNewName ] = useState('');

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} has already been added to the phonebook!`);
      setNewName('');
    } else {
      const personObject = {
        name: newName,
      }

      setNewName('');
      setPersons(persons.concat(personObject));
    }
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <Person key={person.name} person={person} />  
        )}
      </ul>
    </div>
  )
}

export default App;