import React, { useState } from 'react';
import Operation from './Operation';
import { addOperat } from "./api/operations";

const Operations = ({ taskID, form, setForm, operations, setOperations, status }) => {
  const [oper, setOper] = useState("");

  const onUpdateOperat = (id, time) => {
    if (typeof setOperations === "function") {
      setOperations(prevState => {
        const buff = [...prevState];
        const idx = buff.indexOf(buff.find(val => val.id === id));
        buff[idx] = { ...buff[idx], timeSpent: time };
        return buff;
      });
    }
  };

  const newOperat = operat => {
    if (typeof setOperations === "function" && typeof setForm === "function") {
      setOperations(prevState => [operat, ...prevState]);
      setForm(false);
      setOper("");
    }
  };

  const submitHandler = e => {
    e.preventDefault();
    addOperat(taskID, oper, newOperat);
  };

  return (
    <>
      <div
        className="card-body"
        hidden={!form}
      >
        <form onSubmit={submitHandler}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Operation description"
              name="oper"
              value={oper}
              onChange={e => setOper(e.target.value)}
            />

            <div className="input-group-append">
              <button className="btn btn-info">
                Add
                <i className="fas fa-plus-circle ml-1" />
              </button>
            </div>
          </div>
        </form>
      </div>

      <ul className="list-group list-group-flush">
        {
          operations.map(val => {
            return (
              <Operation
                key={val.id}
                description={val.description}
                id={val.id}
                onUpdateOperat={onUpdateOperat}
                // onRemoveOperation={}
                timeSpent={val.timeSpent}
                status={status}
              />
            );
          })
        }
      </ul>
    </>
  );
};

export default Operations;
