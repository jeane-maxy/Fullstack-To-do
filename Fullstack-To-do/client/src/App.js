import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const fetchTasks = async () => {
    const res = await axios.get(`http://localhost:5000/api/tasks`);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (task.trim()) {
      await axios.post('http://localhost:5000/api/tasks', {task});
      setTask('');
      fetchTasks();
    }
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    fetchTasks();
  };

  const deleteAll = async () => {
    for (const t of tasks) {
      await axios.delete(`http://localhost:5000/api/tasks/${t._id}`);
    }
    fetchTasks();
  };

  return (
    <div className="app">
      <h2>Enter the Task:</h2>
      <input
        type="text"
        value={task}
        placeholder="Enter a task"
        onChange={(e) => setTask(e.target.value)}
      />
      <div className="buttons">
        <button onClick={addTask}>Add Task</button>
        <button onClick={() => selectedTaskId && deleteTask(selectedTaskId)}
          disabled={!selectedTaskId}
          >
            Delete Task</button>
        <button onClick={deleteAll}>Delete All Tasks</button>
      </div>
      <div className="task-list">
        {tasks.length > 0 ? (
  tasks.map((t) => (
    <div
      key={t._id}
      className={`task-item${selectedTaskId === t._id ? ' selected' : ''}`}
      onClick={() => setSelectedTaskId(t._id)}
      style={{ cursor: 'pointer' }}
    >
      <p>{t.title}</p>
    </div>
  ))
) : (
  <p>No tasks available.</p>
)}
      </div>
      <button className="exit-button" onClick={() => window.close()}>
        Exit
      </button>
    </div>
  );
}

export default App;