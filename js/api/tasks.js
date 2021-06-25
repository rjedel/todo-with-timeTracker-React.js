import { API_KEY, API_URL } from "./constants";

/**
 * Fetch all tasks
 * @param {function} successCallback - Function that saves incoming data
 */
const getTasks = async (successCallback) => {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      headers: {
        Authorization: API_KEY,
      },
    });

    const data = await response.json();

    if (data.error || typeof successCallback !== "function") {
      throw new Error('Error!');
    }

    successCallback(data.data);

  } catch (err) {
    console.log(err);
  }
};

const addTask = async (title, description, successCallback) => {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        Authorization: API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({ title, description, status: "open" })
    });

    const data = await response.json();

    if (data.error || typeof successCallback !== 'function') {
      throw new Error('Error!');
    }

    successCallback(data.data);

  } catch (err) {
    console.log(err);
  }
};

const deleteTask = async (id, successCallback) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: API_KEY,
      },
    });

    const data = await response.json();

    if (data.error || typeof successCallback !== "function") {
      throw new Error("Error!");
    }

    successCallback(id);

  } catch (err) {
    console.log(err);
  }
};

const finishTask = async (id, title, description, successCallback) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: {
        Authorization: API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, description, status: "closed" })
    });

    const data = await response.json();

    if (data.error || typeof successCallback !== "function") {
      throw new Error("Error!");
    }

    successCallback(id);

  } catch (err) {
    console.log(err);
  }
};

export {
  getTasks,
  addTask,
  deleteTask,
  finishTask,
};
