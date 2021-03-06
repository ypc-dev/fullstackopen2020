import React, { useState, useEffect } from 'react';
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import { SuccessNotification, ErrorNotification } from './components/Notification';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [notificationMessage, setNotificationMesage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(nameFilter));

  useEffect(() => {
    personService
      .getPersons()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} has already been added to the phonebook, replace the old number with the new one?`)) {
        const personToUpdate = persons.find(x => x.name === newName);
        const updatedPerson = { ...personToUpdate, number: newNumber };

        personService
          .updatePerson(personToUpdate.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== personToUpdate.id ? person : returnedPerson));
            setNewName('');
            setNewNumber('');
            setNotificationMesage(`${newName}'s old number has been replaced with the new number.`);
            setTimeout(() => {
              setNotificationMesage(null)
            }, 3000);
          })
          .catch(error => {
            setErrorMessage(
              `Information of '${newName} has already been removed from the server.'`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 3000)
            setPersons(persons.filter(person => person.id !== updatedPerson.id));
          });
          
      }

      
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };

      personService
        .createPerson(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(personObject));
          setNewName('');
          setNewNumber('');
          setNotificationMesage(`${personObject.name} has been added.`);
          setTimeout(() => {
            setNotificationMesage(null)
          }, 3000);
        })
    }
  }

  const deletePerson = (id) => {
    const personToDelete = persons.find(person => person.id === id);

    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
        .deletePerson(personToDelete.id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== personToDelete.id));
        });
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
      <SuccessNotification message={notificationMessage} />
      <ErrorNotification message={errorMessage} />
      <Filter value={nameFilter} onChange={handleNameFilterChange} />
      <h3>Add a new</h3>
      <PersonForm onSubmit={addPerson} 
                  nameValue={newName} 
                  nameOnChange={handleNameChange} 
                  numberValue={newNumber} 
                  numberOnChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} onClick={deletePerson} />
    </div>
  )
}

export default App;