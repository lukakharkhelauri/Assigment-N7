import React, { useState } from 'react';
import moonLogo from "/images/Color_Scheme.svg";
import deleteButton from '/images/trash-svgrepo-com1.svg';
import edit from "/images/edit.svg";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState('');
  const [noteText, setNoteText] = useState('');
  const [notes, setNotes] = useState([]);
  const [showAddNote, setShowAddNote] = useState(false);
  const [editing, setEditing] = useState(null);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const deleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  const addNote = () => {
    if (editing !== null) {
      const updatedNotes = [...notes];
      updatedNotes[editing].text = noteText;
      setNotes(updatedNotes);
      setEditing(null);
    } else {
      const newNote = {
        text: noteText,
        completed: false,
      };
      setNotes([...notes, newNote]);
    }

    setNoteText('');
    setShowAddNote(false);
  };

  const toggleNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes[index].completed = !updatedNotes[index].completed;
    setNotes(updatedNotes);
  };

  const editNote = (index) => {
    setEditing(index);
    setNoteText(notes[index].text);
    setShowAddNote(true);
  };

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <div className="header">
        <div className="search">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <img
          className={`dark-mode-btn ${darkMode ? 'dark' : ''}`}
          onClick={toggleDarkMode}
          src={moonLogo}
          alt="moonLogo"
        />
      </div>

      <button className="add-note-button" onClick={() => setShowAddNote(true)}>
        +
      </button>

      {showAddNote && (
        <div className="add-note-modal">
          <input
            type="text"
            placeholder="Add a note..."
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
          />
          <button className="submit-button" onClick={addNote}>
            {editing !== null ? 'Edit' : 'Submit'}
          </button>
          <button className="cancel-button"onClick={() => setShowAddNote(false)}>Cancel</button>
        </div>
      )}

      <div className="notes-section">
        {filteredNotes.map((note, index) => (
          <div key={index} className={`note ${note.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={note.completed}
              onChange={() => toggleNote(index)}
            />
            <span>{note.text}</span>
            <img
              className="delete-button"
              src={deleteButton}
              alt="Delete Button"
              onClick={() => deleteNote(index)}
            />
            <img
              className="edit-button"
              src={edit}
              alt="Edit Button"
              onClick={() => editNote(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
