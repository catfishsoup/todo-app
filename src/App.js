import './App.scss'
import React, { useState, useRef } from 'react'
import trashbin from './trashbin.svg'

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



const List = ({input, deleteNote, crossNote, labelRef, editdisable}) => {
  return (
    <>
    {input.map((note => <div key={note.id} className="note-box">
      <input type="checkbox" className="check-box" onClick={() => crossNote({editdisable})}/>
      <span contentEditable="true" suppressContentEditableWarning={true} className="todo-text" ref={labelRef} spellcheck="false">{note.value}</span>
      <button onClick={() => deleteNote(note.value)} className="del-btn"><img src={trashbin}/></button>
      </div>))}
    </>
    
  )
}

const Count = ({noteCount, completeNote}) => {
  return (
    <>
      <div>{completeNote} out of {noteCount} task completed</div>    
    </>
  )
}

const App = () => {

  const [input, setInput] = useState('')
  const [countNote, setcountNote] = useState(0)
  const [completeNote, setcompleteNote] = useState(0)
  const [notes, setNotes] = useState([])
  let ref = React.createRef()
  const [checked, setChecked] = useState(false) 

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const addNote = (e) => {
    e.preventDefault()
    if(input !== '') {
      const noteObject = {
        value: input, 
        id: notes.length + 1,
        checked: false 
      }
      setNotes([...notes, noteObject])
      setcountNote(countNote + 1)
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

  const crossNote = () => {
    if(checked === false) {
      ref.current.style.textDecoration = 'line-through'
      setcompleteNote(completeNote + 1 )
    } else {
      ref.current.style.textDecoration = 'none'
      setcompleteNote(completeNote - 1 )
    }

    setChecked(!checked)
  }


  return(
    <div className="container">
    <Title name="Let's get things done today!"/>
    <Note input={input} handleInputChange={handleInputChange} addNote={addNote}/>
    {/* Passing ref into the List components, then using it to access in the main component  */}
    <List input={notes} deleteNote={delNote} crossNote={crossNote} labelRef={ref}/>
    <Count noteCount={countNote} completeNote={completeNote}/>
  </div>
  )
  
}
  


export default App