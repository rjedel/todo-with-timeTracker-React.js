import React, { useState } from 'react';

const NewTask = ({ onNewTask, addNewTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submitHandler = e => {
    e.preventDefault();
    if (typeof onNewTask === "function" && typeof addNewTask === "function") {
      onNewTask(title, description, addNewTask);
    }
  };

  return (
    <div className="card shadow">
      <div className="card-body">
        <h1 className="card-title">New task</h1>
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <input type="text"
              className="form-control"
              name="title"
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input type="text"
              className="form-control"
              name="description"
              placeholder="Description"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
          <button className="btn btn-info">
            Add task
            <i className="fas fa-plus-circle ml-1"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewTask;
