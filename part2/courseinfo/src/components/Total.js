import React from 'react'

const Total = ({ parts }) => {
  const totalExercises = parts.map((part) => part.exercises)
                              .reduce((accum, exercises) => accum + exercises, 0)
  return (
    <p><strong>Total of {totalExercises} exercises</strong></p>
  ) 
}

export default Total;