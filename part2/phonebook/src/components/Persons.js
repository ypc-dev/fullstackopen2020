import React from 'react'

const Persons = ({ persons }) => {
  return (
    <ul>
      {persons.map(person =>
        <Person key={person.name} person={person} />  
      )}
    </ul>
  )
}

const Person = ({person}) => {
  return (
    <li>{person.name}: {person.number}</li>
  )
}

export default Persons;