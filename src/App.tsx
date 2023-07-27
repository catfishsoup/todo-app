import './App.scss'
import React, { useState } from 'react'
import trashbin from './trashbin.svg'
import { v4 as uuidv4 } from 'uuid';
const Title = ({name}) => {
  return (
    <div className="title">
    <h1>{name}</h1>
    </div>
  )
}

const Note = ({input, handleInputChange, addNote}) => {
    return (
      <div className="test">
        <div><input placeholder="Enter a task" value={input} type="text" onChange={handleInputChange} className="input-box"/></div> 
        <button onClick={addNote} type="submit" className="add-btn">+</button>
      </div>
      
    )
  }

  const List = ({input, deleteNote, crossNote}) => {
    return (
      <>
      {input.map((note => <div key={note.id} className="note-box">
        <input type="checkbox" className="check-box" onClick={() => crossNote(note)}/>
        <span contentEditable="true" suppressContentEditableWarning={true} className={note.checked === true ? "todo-text-crossed" : "todo-text"} spellCheck="false"> {note.value}</span>
        <button onClick={() => deleteNote(note)} className="del-btn"><img src={trashbin} alt="trashbin-icon"/></button>
        </div>))}
      </>
      
    )
  }
  
  const Count = ({noteCount, completeNote}) => {
    return (
      <>
        <small className="note-tracker"> {completeNote} out of {noteCount} task completed</small>    
      </>
    )
  }

const App = () => {

  const [input, setInput] = useState('')
  const [countNote, setcountNote] = useState(0)
  const [completeNote, setcompleteNote] = useState(0)
  const [notes, setNotes] = useState([])
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const addNote = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
      const noteObject = {
        value: input, 
        id: uuidv4(),
        checked: false
      }
      setNotes([...notes, noteObject])
      setcountNote(countNote + 1)
    setInput('')
  }


  const delNote = (note) => {
      const currentnote = note;
      // Return a new array that doesn't have the current note. 
      setNotes(notes.filter(note => note !== currentnote))
      setcountNote(countNote - 1)
      if(completeNote >= 1) {
        setcompleteNote(completeNote - 1)
      }
  }

 const crossNote = (currNote) => {
  let array = notes.map(crossNote => {
    if(crossNote.id === currNote.id) {
      return {...crossNote, checked: !crossNote.checked}
    }
    return crossNote
  })
  setNotes(array)
  if(currNote.checked === false) {
    setcompleteNote(completeNote + 1)
  } else {setcompleteNote(completeNote - 1)}
 }


  return(
    <div className="container">
    <Title name="Let's get things done today!"/>
    <Note input={input} handleInputChange={handleInputChange} addNote={addNote}/>
    {/* Passing ref into the List components, then using it to access in the main component  */}
    <List input={notes} deleteNote={delNote} crossNote={crossNote}/>
    <Count noteCount={countNote} completeNote={completeNote}/>
  </div>
  )
  
}
  


export default App