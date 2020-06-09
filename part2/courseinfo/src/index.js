import React from 'react';
import ReactDOM from 'react-dom';

const Course = ({ course }) => {
  return (
    <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = ({ text }) => {
  return (
    <h1>{text}</h1>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      <ul>
        {parts.map((part) =>
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        )}
      </ul>
    </div>
  )
}

const Part = ({ name, exercises }) => {
  return (
    <li>{name} ({exercises} exercises)</li>
  )
}

const Total = ({ parts }) => {
  const totalExercises = parts.map((part) => part.exercises)
                              .reduce((accum, exercises) => accum + exercises, 0)
  return (
    <p><strong>Total of {totalExercises} exercises</strong></p>
  ) 
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      },
    ]
  }

  return <Course course={course} />
}

ReactDOM.render(<App />, document.getElementById('root'))