import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const HeadingDisplay = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

const Statistics = ({text, value}) => {
  return (
    <p>{text}: {value}</p>
  )
}

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [feedback, setFeedbacks] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    all() {
      return (this.good + this.neutral + this.bad);
    },
    average() {
      return (this.good * 1 + this.bad * -1) / this.all();
    },
    positive() {
      return (`${this.good / this.all()} %`);
    }
  });

  const handleGoodFeedback = () =>
    setFeedbacks({...feedback, good: feedback.good + 1 });

  const handleNeutralFeedback = () => 
    setFeedbacks({...feedback, neutral: feedback.neutral + 1 });

  const handleBadFeedback = () => 
  setFeedbacks({...feedback, bad: feedback.bad + 1 });

  return (
    <div>
      <HeadingDisplay text="Give feedback" />
      <Button onClick={handleGoodFeedback} text="good" />
      <Button onClick={handleNeutralFeedback} text="neutral" />
      <Button onClick={handleBadFeedback} text="bad" />
      <HeadingDisplay text="Statistics" />
      <Statistics text="good" value={feedback.good} />
      <Statistics text="neutral" value={feedback.neutral} />
      <Statistics text="bad" value={feedback.bad} />
      <Statistics text="all" value={feedback.all()} />
      <Statistics text="average" value={feedback.average()} />
      <Statistics text="positive" value={feedback.positive()} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)