import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const HeadingDisplay = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

const ContentDisplay = ({text, value}) => {
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
      <ContentDisplay text="good" value={feedback.good} />
      <ContentDisplay text="neutral" value={feedback.neutral} />
      <ContentDisplay text="bad" value={feedback.bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)