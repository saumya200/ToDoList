import { useState } from "react";
import ToDoModel from "./ToDoModel";
import Tasks from "./Tasks";
import "./ToDoList.css";

function ToDoList({ handleAdd }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };
  console.log(isOpen);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="todo-list-container">
      <div className="todo-form">
        <h1 className="todo-list-text">TODO LIST</h1>
        <button className="open-button" onClick={() => handleOpen()}>
          +
        </button>
      </div>
      {isOpen && <ToDoModel handleClose={handleClose} handleAdd={handleAdd} />}
    </div>
  );
}

export default ToDoList;
