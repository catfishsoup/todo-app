import "./App.scss";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAppSelector, useAppDispatch } from "./redux/hooks";
import { addNote, deleteNote, crossNote } from "./redux/reducer";
import { subtract, add } from "./redux/count_reducer";

const App = () => {
  return (
    <main className="container">
      <div className="title">
        <h1>Let's get things done today</h1>
      </div>
      <Note/>
      <List/>
      <Count/>
    </main>
  );
};

const Note = () => {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState("");

  const handleAddTodo = () => {
    if (input !== "") {
      dispatch(addNote({ value: input, id: uuidv4(), checked: false }));
      dispatch(add())
    }
    setInput("");
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
  let notes = useAppSelector((state) => state.todo);
  const dispatch = useAppDispatch();
  const trashbin: string = require("./trashbin.svg").default;

  const reduceNote = () => {
    dispatch(subtract())
  }
  return (
    <>
      {notes.map((note) => (
        <div key={note.id} className="note-box">
          <input
            type="checkbox"
            className="check-box"
            onClick={() => {dispatch(crossNote(note)); reduceNote()}}
          />
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
          <button
            className="del-btn"
            onClick={() => dispatch(deleteNote(note.id))}
          >
            <img src={trashbin} alt="trashbin-icon" />
          </button>
        </div>
      ))}
    </>
  );
};

const Count = () => {
  let ongoing = useAppSelector((state) => state.count.ongoing);
  let finish = useAppSelector((state) => state.count.complete);
  return (
    <>
      <small className="note-tracker">
        {" "}
        {finish} out of {ongoing} task completed
      </small>
    </>
  );
};
export default App;
