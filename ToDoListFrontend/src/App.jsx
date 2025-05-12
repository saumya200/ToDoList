// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useEffect, useState } from "react";
import "./App.css";
import Tasks from "./Components/Tasks.jsx";
import ToDoList from "./Components/ToDoList.jsx";

function App() {
  // const [count, setCount] = useState(0)

  const [todos, setTodos] = useState([]);

  const [count, setCount] = useState(0);

  const handleAdd = (newTodo) => {
    setTodos((prev) => {
      return [...prev, newTodo];
    });
  };

  const fetchAllTodos = async () => {
    const todos = await fetch("http://localhost:5283/api/ToDo/getall", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    const todosJson = await todos.json();
    console.log(todosJson);
    setTodos(todosJson);
  };

  useEffect(() => {
    fetchAllTodos();
  }, []);

  const createToDo = async (todo) => {
    const todos = await fetch("http://localhost:5283/api/ToDo/createToDo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        title: todo,
      }),
    });
    await fetchAllTodos();
  };

  const updateToDo = async (id, updatedToDo) => {
    const todos = await fetch(`http://localhost:5283/api/ToDo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        title: updatedToDo,
      }),
    });
    if (!todos.ok) {
      console.log("Error updating todo");
    } else {
      console.log("Todo updated successfully", id);
    }
  };

  const deleteToDo = async (id) => {
    const todos = await fetch(`http://localhost:5283/api/ToDo/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

    if (!todos.ok) {
      console.log("Error deleting todo");
    } else {
      console.log("Todo deleted successfully", id);
    }
  };

  return (
    <div className="app">
      <ToDoList handleAdd={createToDo} />
      <Tasks arr={todos} updateToDo={updateToDo} />
    </div>
  );
}

export default App;
