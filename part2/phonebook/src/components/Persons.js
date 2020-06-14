import React from 'react'

const Persons = ({ persons, onClick }) => {
  return (
    <ul>
      {persons.map(person =>
        <Person key={person.name} person={person} onClick={onClick} />  
      )}
    </ul>
  )
}

const Person = ({ person, onClick }) => {
  return (
    <li>
      {person.name}: {person.number}
      <button onClick={() => onClick(person.id)}>delete</button>
    </li>
  )
}

export default Persons;