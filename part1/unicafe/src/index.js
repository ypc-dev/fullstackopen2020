import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const HeadingDisplay = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

const Statistics = ({feedbacks}) => {
  if(feedbacks.all() === 0) {
    return <p>No feedback given</p>
  }
  
  return (
    <div>
      <table>
        <tbody>
          <Statistic text="good" value={feedbacks.good} />
          <Statistic text="neutral" value={feedbacks.neutral} />
          <Statistic text="bad" value={feedbacks.bad} />
          <Statistic text="all" value={feedbacks.all()} />
          <Statistic text="average" value={feedbacks.average()} />
          <Statistic text="positive" value={feedbacks.positive()} />
        </tbody>
      </table>
    </div>
  )
}

const Statistic = ({text, value}) => {
  return (
    <tr>
      <td>{text}: {value}</td>
    </tr>
  )
}

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [feedbacks, setFeedbacks] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    all() {
      return (this.good + this.neutral + this.bad);
    },
    average() {
      return ((this.good * 1 + this.bad * -1) / this.all()).toFixed(2);
    },
    positive() {
      const positivePercentage = ((this.good / this.all()) * 100).toFixed(2);
      return (`${positivePercentage} %`);
    }
  });

  const handleGoodFeedback = () =>
    setFeedbacks({...feedbacks, good: feedbacks.good + 1 });

  const handleNeutralFeedback = () => 
    setFeedbacks({...feedbacks, neutral: feedbacks.neutral + 1 });

  const handleBadFeedback = () => 
    setFeedbacks({...feedbacks, bad: feedbacks.bad + 1 });

  const handleReset = () => 
    setFeedbacks({...feedbacks, good: 0, neutral: 0, bad: 0});

  return (
    <div>
      <HeadingDisplay text="Give feedback" />
      <Button onClick={handleGoodFeedback} text="good" />
      <Button onClick={handleNeutralFeedback} text="neutral" />
      <Button onClick={handleBadFeedback} text="bad" />
      <Button onClick={handleReset} text="reset" />
      <HeadingDisplay text="Statistics" />
      <Statistics feedbacks={feedbacks} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)