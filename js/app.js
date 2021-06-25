import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { getTasks, addTask } from "./api/tasks";
import NewTask from "./NewTask";
import Task from "./Task";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks(setTasks);
  }, []);

  const addNewTask = task => {
    setTasks(prevState => [task, ...prevState]);
  };

  const onRemoveTask = taskId => {
    setTasks(prevState => {
      return prevState.filter(val => val.id !== taskId);
    });
  };

  const onFinishTask = taskId => {
    setTasks(prevState => {
      return prevState.map(val => val.id === taskId ? { ...val, status: "close" } : val);
    });
  };

  return (
    <>
      <NewTask
        onNewTask={addTask}
        addNewTask={addNewTask}
      />
      {
        tasks.map(val => {
          return (
            <Task
              key={val.id}
              title={val.title}
              description={val.description}
              status={val.status}
              id={val.id}
              onRemoveTask={onRemoveTask}
              onFinishTask={onFinishTask}
            />
          );
        })
      }
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
