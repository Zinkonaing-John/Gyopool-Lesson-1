import React, { useState } from "react";
import "./App.css";
import Weather from "./weather";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([...tasks, { text: input, done: false }]);
    setInput("");
  };

  const toggleDone = (index) => {
    const newTasks = [...tasks];
    newTasks[index].done = !newTasks[index].done;
    setTasks(newTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "done") return task.done;
    if (filter === "notDone") return !task.done;
    return true;
  });

  const total = tasks.length;
  const doneCount = tasks.filter((task) => task.done).length;

  return (
    <div className="app">
      <div className="container">
        <div className="todo-section">
          <h1 className="title">📝 To-Do List</h1>
          <div className="input-container">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addTask()}
              placeholder="Add a new task..."
            />
            <button onClick={addTask}>Add</button>
          </div>
          <div className="filters">
            <button
              className={filter === "all" ? "active" : ""}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={filter === "notDone" ? "active" : ""}
              onClick={() => setFilter("notDone")}
            >
              To Do
            </button>
            <button
              className={filter === "done" ? "active" : ""}
              onClick={() => setFilter("done")}
            >
              Done
            </button>
          </div>
          <div className="task-list">
            {filteredTasks.map((task, index) => (
              <div
                key={index}
                className={`task-item ${task.done ? "done" : ""}`}
                onClick={() => toggleDone(tasks.indexOf(task))}
              >
                <span>{task.text}</span>
              </div>
            ))}
          </div>
          <div className="task-summary">
            <span>
              {doneCount} / {total} Done
            </span>
          </div>
        </div>
        <div className="weather-section">
          <Weather />
        </div>
      </div>
    </div>
  );
}
