import { API_KEY, API_URL } from "./constants";

/**
 * Fetch all operations
 * @param {string} id - ID of task
 * @param {function} successCallback - Function that saves incoming data
 */
const getOperations = async (id, successCallback) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}/operations`, {
      headers: {
        Authorization: API_KEY,
      },
    });

    const data = await response.json();

    if (data.error || typeof successCallback !== "function") {
      throw new Error("Error!");
    }

    successCallback(data.data);
  } catch (err) {
    console.log(err);
  }
};

const addOperat = async (taskID, description, successCallback) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${taskID}/operations`, {
      method: "POST",
      headers: {
        Authorization: API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({ description, timeSpent: 0 })
    });

    const data = await response.json();

    if (data.error || typeof successCallback !== "function") {
      throw new Error("Error!");
    }

    successCallback(data.data);

  } catch (err) {
    console.log(err);
  }
};

const updateTime = async (id, description, timeSpent, successCallback) => {
  try {
    const response = await fetch(`${API_URL}/operations/${id}`, {
      method: "PUT",
      headers: {
        Authorization: API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ description, timeSpent })
    });

    const data = await response.json();

    if (data.error || typeof successCallback !== "function") {
      throw new Error("Error!");
    }

    successCallback(data.data.id, data.data.timeSpent);

  } catch (err) {
    console.log(err);
  }
};

export {
  getOperations,
  addOperat,
  updateTime,
};
