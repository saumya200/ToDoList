// import React, { useState } from "react";
// import "./ToDoPriorityColumn.css";

// function ToDoPriorityColumn() {
//   const [toDos, setToDos] = useState([]);
//   return (
//     <div className="priority-name">
//       <div className="column low">
//         <h3>Low Priority</h3>
//         {toDos
//           .filter((todo) => todo.priority === "Low")
//           .map((todo) => (
//             <div key={todo.id} className="todo-item">
//               <h3>{todo.title}</h3>
//             </div>
//           ))}
//       </div>

//       <div className="column medium">
//         <h3>Medium Priority</h3>
//         {toDos
//           .filter((todo) => todo.priority === "Medium")
//           .map((todo) => (
//             <div key={todo.id} className="todo-item">
//               <h3>{todo.title}</h3>
//             </div>
//           ))}
//       </div>

//       <div className="column high">
//         <h3>High Priority</h3>
//         {toDos
//           .filter((todo) => todo.priority === "High")
//           .map((todo) => (
//             <div key={todo.id} className="todo-item">
//               <h3>{todo.title}</h3>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// }

// export default ToDoPriorityColumn;
