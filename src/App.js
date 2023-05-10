import './App.scss'
import { useState } from 'react'


const Title = ({name}) => {
  return (
    <div className="title">
    <h1>{name}</h1>
    </div>
  )
}

const Note = ({input, handleInputChange, addNote}) => {
  return (
    <div>
    <input placeholder="Enter a task" value={input} type="text" onChange={handleInputChange} className="input-box"/><button onClick={addNote} type="submit" className="add-btn">Add</button>
    </div>
  )
}
const List = ({input, deleteNote}) => {
  return (
    <>
    {input.map((note => <div key={note.id} className="note-box">
      <input type="checkbox" className="check-box"/>
      <span contentEditable="true" suppressContentEditableWarning={true} className="todo-text">{note.value}</span>
      <button onClick={() => deleteNote(note.value)} className="del-btn">Delete</button>
      </div>))}
    </>
    
  )
}
const App = () => {

  const [input, setInput] = useState('')
  const [notes, setNotes] = useState([])


  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const addNote = (e) => {
    e.preventDefault()
    if(input !== '') {
      const noteObject = {
        value: input, 
        id: notes.length + 1
      }
      setNotes([...notes, noteObject])
    } else {
      alert('Cannot enter empty string')
    }
    setInput('')
  }
  // Pass in the current note value 
  const delNote = (note) => {
      const currentnote = note;
      setNotes(notes.filter(note => note.value !== currentnote))
  }

  const editNote = (e) => {
    e.preventDefault()
  }
  return(
    <div className="container">
    <Title name="Let's get things done today!"/>
    <Note input={input} handleInputChange={handleInputChange} addNote={addNote}/>
    <List input={notes} deleteNote={delNote}/>
  </div>
  )
  
}
  


export default App