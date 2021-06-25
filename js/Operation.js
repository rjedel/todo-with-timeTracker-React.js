import React, { useState } from 'react';
import { updateTime } from "./api/operations";

const Operation = ({ description, id, onUpdateOperat, onRemoveOperation, timeSpent, status }) => {
  const [visible, setVisible] = useState(true);
  const [timeVal, setTimeVal] = useState("");

  const submitHandler = e => {
    e.preventDefault();
    if (timeVal && typeof onUpdateOperat === "function") {
      let newTime = timeSpent + Number(timeVal);
      newTime = newTime < 0 ? 0 : newTime;
      updateTime(id, description, newTime, onUpdateOperat);
      setVisible(true);
      setTimeVal("");
    }
  };

  const timeToString = time => {
    const hours = Math.floor((time % 3600) / 60);
    const minutes = (time % 3600) % 60;
    return `${hours}h ${minutes}m`;
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        {description}
        <span className="badge badge-success badge-pill ml-2">
          {timeSpent > 0 && timeToString(timeSpent)}
        </span>
      </div>

      <form
        hidden={visible}
        onSubmit={submitHandler}
      >
        <div className="input-group input-group-sm">
          <input
            name="timeVal"
            value={timeVal}
            onChange={e => setTimeVal(e.target.value)}
            type="number"
            className="form-control"
            placeholder="Spent time in minutes"
            style={{ width: "12rem" }}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-success"><i className="fas fa-save"></i></button>
            <button
              className="btn btn-outline-dark"
              onClick={e => {
                e.preventDefault();
                setVisible(true);
                setTimeVal("");
              }}
            >
              <i className="fas fa-times false" />
            </button>
          </div>
        </div>
      </form>

      <div hidden={!visible}>
        <button
          className="btn btn-outline-success btn-sm mr-2"
          hidden={status !== "open"}
          onClick={() => setVisible(false)}
        >
          Add time
          <i className="fas fa-clock ml-1"></i>
        </button>

        <button className="btn btn-outline-danger btn-sm"><i className="fas fa-trash"></i></button>
      </div>
    </li>
  );
};

export default Operation;
