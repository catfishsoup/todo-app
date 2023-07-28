import "./App.scss";
import React, { useState, createContext, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAppSelector, useAppDispatch } from "./redux/hooks";
import { addNote } from "./redux/reducer";

const Note = () => {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState("");

  const handleAddTodo = () => {
    if (input !== "") {
      dispatch(addNote({ value: input, id: uuidv4(), checked: false }));
    }

    setInput("");
    console.log("done");
  };
  return (
    <div className="test">
      <div>
        <input
          placeholder="Enter a task"
          value={input}
          type="text"
          onChange={(e) => setInput(e.target.value)}
          className="input-box"
        />
      </div>
      <button type="submit" className="add-btn" onClick={() => handleAddTodo()}>
        +
      </button>
    </div>
  );
};

const List = () => {
  let notes  = useAppSelector((state) => state.todo);

  // useEffect(() => {
  //   setNotes(useAppSelector(state => state.todo))
  // }, [notes])
  return (
    <>
      {notes.map((note) => (
        <div key={note.id} className="note-box">
          <input type="checkbox" className="check-box" />
          <span
            contentEditable="true"
            suppressContentEditableWarning={true}
            className={
              note.checked === true ? "todo-text-crossed" : "todo-text"
            }
            spellCheck="false"
          >
            {" "}
            {note.value}
          </span>
          <button className="del-btn">
            <img
              src={require("./trashbin.svg")}
              alt="trashbin-icon"
            />
          </button>
        </div>
      ))}
    </>
  );
};

//   const Count = ({complete, total}: tracker) => {
//     return (
//       <>
//         <small className="note-tracker"> {complete} out of {total} task completed</small>
//       </>
//     )
//   }

const App = () => {
  // const delNote = (note: noteObject) => {
  //       const currentnote = note;
  //       // Return a new array that doesn't have the current note.
  //       setNotes(notes.filter(note => note !== currentnote))
  //       setcountNote(countNote - 1)
  //       if(completeNote >= 1) {
  //         setcompleteNote(completeNote - 1)
  //       }
  //   }

  //  const crossNote = (currNote: noteObject) => {
  //   let array = notes.map(crossNote => {
  //     if(crossNote.id === currNote.id) {
  //       return {...crossNote, checked: !crossNote.checked}
  //     }
  //     return crossNote
  //   })
  //   setNotes(array)
  //   if(currNote.checked === false) {
  //     setcompleteNote(completeNote + 1)
  //   } else {setcompleteNote(completeNote - 1)}
  //  }

  return (
    <main className="container">
       <div className="title">
      <h1>Let's get things done today</h1>
    </div>
      <Note />
      <List />
      {/*<Count complete={countNote} total={completeNote}/> */}
    </main>
  );
};

export default App;
