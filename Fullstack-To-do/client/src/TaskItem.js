import React from "react";

function TaskItem({ task, onUpdate, onDelete }) {
  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      <span onClick={() => onUpdate(task._id, { completed: !task.completed })}>
        {task.title}
      </span>
      <button onClick={() => onDelete(task._id)}>❌</button>
    </li>
  );
}

export default TaskItem;