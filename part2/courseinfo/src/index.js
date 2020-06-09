import React from 'react';
import ReactDOM from 'react-dom';

const Courses = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => 
        <Course key={course.id} course={course} />
      )}
    </div>
  )
}

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
      {parts.map((part) =>
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      )}
    </div>
  )
}

const Part = ({ name, exercises }) => {
  return (
    <p>{name} ({exercises} exercises)</p>
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
  
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Courses courses={courses} />
}

ReactDOM.render(<App />, document.getElementById('root'))