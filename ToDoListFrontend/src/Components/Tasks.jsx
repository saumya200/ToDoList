import React, { useEffect, useState } from "react";
import "./Tasks.css";

function Tasks({ arr, updateToDo }) {
  console.log(arr);

  const [activeId, setActiveId] = useState(null);
  const [strikeIds, setStrikeIds] = useState([]);

  const handleClick = (id) => {
    if (strikeIds.includes(id))
      setStrikeIds(strikeIds.filter((item) => item !== id));
    else setStrikeIds([...strikeIds, id]);
  };

  useEffect(() => {
    if (arr.length > 0) {
      const filteredIds = arr?.filter((item) => item.isComplete === true);
      console.log(filteredIds);
      const ids = filteredIds.map((item) => item.id);
      console.log(ids);
      setStrikeIds(ids);
    }
  }, [arr?.length > 0]);
  

  console.log(strikeIds, arr);

  return (
    <div className="tasks-container">
      <div className="tasks">
        {arr.map((task) => {
          return (
            <div className="tasks-key" key={task?.id}>
              <h3
                className={`todo-item ${
                  strikeIds.includes(task?.id) ? "strike" : ""
                }`}
                onClick={() => {
                  handleClick(task?.id);
                }}>
                {task?.title}
                <span className={`priority ${task.priority.toLowerCase()}`}>
                  {task.priority}
                </span>
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Tasks;
