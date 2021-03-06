import React, { useEffect, useState } from 'react';
import { deleteTask, finishTask } from './api/tasks';
import { getOperations } from "./api/operations";
import Operations from './Operations';

const Task = ({ title, description, id, status, onRemoveTask, onFinishTask }) => {
  const [operations, setOperations] = useState([]);
  const [form, setForm] = useState(false);

  useEffect(() => {
    getOperations(id, setOperations);
  }, []);

  const removeTask = e => {
    e.preventDefault();
    if (operations.length === 0 && typeof onRemoveTask === "function") {
      deleteTask(id, onRemoveTask);
    }
  };

  const endTask = e => {
    e.preventDefault();
    if (typeof onFinishTask === "function") {
      finishTask(id, title, description, onFinishTask);
    }
  };

  return (
    <section className="card mt-5 shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center">
        <div>
          <h5>{title}</h5>
          <h6 className="card-subtitle text-muted">{description}</h6>
        </div>
        <div>
          <button
            className="btn btn-info btn-sm mr-2"
            hidden={status !== "open"}
            onClick={() => setForm(prev => !prev)}
          >
            Add operation
            <i className="fas fa-plus-circle ml-1" />
          </button>
          <button
            className="btn btn-dark btn-sm"
            hidden={status !== "open"}
            onClick={endTask}
          >
            Finish
            <i className="fas fa-archive ml-1" />
          </button>
          <button
            className="btn btn-outline-danger btn-sm ml-2"
            hidden={operations.length !== 0}
            onClick={removeTask}
          >
            <i className="fas fa-trash false" />
          </button>
        </div>
      </div>
      <Operations
        taskID={id}
        form={form}
        setForm={setForm}
        operations={operations}
        setOperations={setOperations}
        status={status}
      />
    </section>
  );
};

export default Task;
