import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'

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

export default Courses;