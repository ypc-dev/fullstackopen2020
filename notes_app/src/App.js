import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Note from './components/Note';
import noteService from './services/notes';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('a new note');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState('Some error happened!');

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true);

  useEffect(() => {
    noteService
      .getAll()
        .then(initialNotes => {
          setNotes(initialNotes);
      });
  }, [])

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toString(),
      important: Math.random() < 0.5,
    }

    noteService
      .create(noteObject)
        .then(returnedNote => {
          setNotes(notes.concat(returnedNote));
          setNewNote('');
      })
  }

  const Notification = ({ message }) => {
    if (message === null) {
      return null;
    }

    return (
      <div className="error">
        {message}
      </div>
    )
  }

  const Footer = () => {
    const footerStyle = {
      color: 'green',
      fontStyle: 'italic',
      fontSize: 16
    }
  
    return (
      <div style={footerStyle}>
        <br />
        <em>Note app, Department of Computer Science, University of Helsinki 2020</em>
      </div> 
    )
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
        .then(returnedNote => {
          setNotes(notes.map(note => note.id !== id ? note : returnedNote));
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content} was already removed from the server.'`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000)
        setNotes(notes.filter(n => n.id !== id));
      });
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note 
            key={note.id} 
            note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)} 
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">Save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App