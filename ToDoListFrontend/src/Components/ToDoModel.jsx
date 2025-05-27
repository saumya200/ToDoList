import React from "react";
import { useState } from "react";
import "./ToDoModel.css";

function ToDoModel({ handleClose, handleAdd }) {
  const [toDoInput, setTodoInput] = useState("");

  const handleChange = (e) => {
    setTodoInput(e.target.value);
    // setTodoInput("");
  };

  const [priority, setPriority] = useState("low");

  return (
    <div className="todo-model-container">
      <div className="todo-model">
        <h1 className="todo-model-text"> Add new task....</h1>
        <input
          type="text"
          name="toDoInput"
          value={toDoInput}
          placeholder="Enter your task here..."
          onChange={handleChange}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <div className="todo-model-buttons">
          <button
            className="close-button"
            onClick={() => {
              handleClose();
            }}>
            {" "}
            close{" "}
          </button>
          <button
            className="save--button"
            onClick={() => {
              handleAdd(toDoInput, priority);
              setTodoInput("");
              handleClose();
            }}>
            {" "}
            add{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ToDoModel;
