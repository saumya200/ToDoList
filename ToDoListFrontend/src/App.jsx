// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useEffect, useState } from "react";
import "./App.css";
import Tasks from "./Components/Tasks.jsx";
import ToDoList from "./Components/ToDoList.jsx";
import Header from "./Components/Header.jsx";
// import ToDoPriorityColumn from "./Components/ToDoPriorityColumn.jsx";
import Login from "./Components/Login/Login.jsx";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";

function App() {
  // const [count, setCount] = useState(0)

  const [todos, setTodos] = useState([]);

  const [count, setCount] = useState(0);

  const [deletedToDos, setDeletedToDos] = useState([]);

  const handleAdd = (newTodo, title, priority) => {
    setTodos((prev) => {
      return [...prev, newTodo];
    });
    createToDo(newTodo, priority);
  };

  const userId = localStorage.getItem("userId");

  // const [user, setUser] = useState(() => {
  //   const storedUser = localStorage.getItem("user");
  //   return storedUser ? JSON.parse(storedUser) : null;
  // });
  const [user, setUser] = useState(null);
  const handleSetUser = (userData) => {
    setUser(userData);
  };

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // ------------------------------------------------------------------------------------------------------------------

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

  // useEffect(() => {
  //   fetchAllTodos();
  // }, []);

  const createToDo = async (todo, priority) => {
    const todos = await fetch("http://localhost:5283/api/ToDo/createToDo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        title: todo,
        isComplete: false,
        priority: priority,
        DeletedAt: null,
        userId: userId,
      }),
    });
    await fetchAllTodos();
  };

  const updateToDo = async (id, updatedTitle, priority) => {
    const todos = await fetch(`http://localhost:5283/api/ToDo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        id: id,
        title: updatedTitle,
        isComplete: true,
        priority: priority,
        isDeleted: true,
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

  // const getDeletedToDo = async () => {
  //   const todos = await fetch("http://localhost:5283/api/ToDo/deleted", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Access-Control-Allow-Origin": "*",
  //     },
  //   });
  //   const deletedToDosJson = await todos.json();
  //   setDeletedToDos(deletedToDosJson);
  //   // getDeletedToDo();
  // };

  // useEffect(() => {
  //   getDeletedToDo();
  // }, []);

  const fetchAllTodosByUserId = async (userId) => {
    const todos = await fetch(`http://localhost:5283/api/ToDo/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const todosJson = await todos.json();
    console.log(todosJson);
    setTodos(todosJson);
  };

  useEffect(() => {
    if (user?.userId) {
      fetchAllTodosByUserId(user?.userId);
    }
  }, [user?.userId]);

  //--------------------------------------------------------------------------------------------------------------------------------------
  // console.log(user, "Hi");
  return (
    <div className="app">
      <Header toggleTheme={toggleTheme} theme={theme} />
      {!user?.userId ? (
        <Login onLogin={handleSetUser} />
      ) : (
        <>
          <ToDoList handleAdd={createToDo} user={user} />
          <Tasks arr={todos} updateToDo={updateToDo} />
        </>
      )}
    </div>
    //   <Router>
    //     <Header toggleTheme={toggleTheme} theme={theme} />
    //     <Routes>
    //       <Route
    //         path="/"
    //         element={
    //           userId ? <Navigate to="todos" /> : <Login onLogin={handleSetUser} />
    //         }
    //       />
    //       <Route
    //         path="todos"
    //         element={
    //           userId ? (
    //             <>
    //               <ToDoList handleAdd={createToDo} user={{ userId }} />
    //               <Tasks
    //                 arr={todos}
    //                 updateToDo={updateToDo}
    //                 deleteToDo={deleteToDo}
    //               />
    //             </>
    //           ) : (
    //             <Navigate to="/" />
    //           )
    //         }
    //       />
    //       <Route path="*" element={<Navigate to="/" />} />
    //     </Routes>
    //   </Router>
  );
}

export default App;
