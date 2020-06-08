import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const AnecdoteOfDay = ({anecdote, vote}) => {
  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <q>{anecdote}</q>
      <p>Has {vote} votes</p>
    </div>
  )
}

const AnecdoteMostVotes = ({anecdote, vote}) => {
  if (vote === 0) {
    return (
      <div>
        <h1>Anecdote with the most votes</h1>
        <p>No votes casted yet.</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Anecdote with the most votes</h1>
      <q>{anecdote}</q>
      <p>Has {vote} votes.</p>
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0));
  const [indexOfHighest, setIndexOfHighest] = useState(0);

  const displayRandomAnecdote = () => {
    setSelected(Math.floor(Math.random() * props.anecdotes.length));  
  }

  const updateVotes = () => {
    const updatedVotes = [...votes];
    updatedVotes[selected] = updatedVotes[selected] + 1;
    setVotes(updatedVotes);
    const indexOfHighest = updatedVotes.indexOf(Math.max(...updatedVotes));
    setIndexOfHighest(indexOfHighest);
  }

  return (
    <div>
      <AnecdoteOfDay anecdote={props.anecdotes[selected]} vote={votes[selected]} />
      <Button onClick={updateVotes} text="vote" />
      <Button onClick={displayRandomAnecdote} text="next anecdote" />
      <AnecdoteMostVotes anecdote={props.anecdotes[indexOfHighest]} vote={votes[indexOfHighest]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)