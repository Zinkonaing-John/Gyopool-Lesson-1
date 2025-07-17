import React, { useState } from "react";
import "./App.css";
import Weather from "./weather";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

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

  const showAll = () => setFilter("all");
  const showDone = () => setFilter("done");
  const showNotDone = () => setFilter("notDone");

  const [filter, setFilter] = useState("all");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "done") return task.done;
    if (filter === "notDone") return !task.done;
    return true;
  });

  const total = tasks.reduce((sum) => sum + 1, 0);

  return (
    <div className="app">
      <h1>📝 To-Do + Weather</h1>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a task"
      />
      <button onClick={addTask}>Add</button>

      <div>
        {filteredTasks.map((task, index) => (
          <div
            key={index}
            onClick={() => toggleDone(index)}
            style={{
              textDecoration: task.done ? "line-through" : "none",
              color: task.done ? "green" : "black",
              cursor: "pointer",
              margin: "5px 0",
            }}
          >
            {task.text}
          </div>
        ))}
      </div>
      <Weather />

      <div style={{ marginTop: "10px" }}>
        <button onClick={showAll}>Show All</button>
        <button onClick={showDone}>Done</button>
        <button onClick={showNotDone}>Not Done</button>
      </div>

      <h3>Total Tasks: {total}</h3>
    </div>
  );
}
