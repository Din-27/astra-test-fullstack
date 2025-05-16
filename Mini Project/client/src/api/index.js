import axios from "axios";
import { API } from "../configs/api";

export const getTodoById = async (id) => {
  try {
    const result = await API.get(`/todo/${id}`);
    if (result.status === 200) {
      return { status: true, result };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return { status: false, result: error.response.data.message || error.message }
      } else if (error.request) {
        return { status: false, result: "No response from server" }
      } else {
        return { status: false, result: "Error setting up request:" + error.message }
      }
    } else {
      return { status: false, result: "Unexpected error:" + error }
    }
  }
};

export const getTodos = async () => {
  try {
    const result = await API.get("/todo");
    if (result.status === 200) {
      return { status: true, result };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return { status: false, result: error.response.data.message || error.message }
      } else if (error.request) {
        return { status: false, result: "No response from server" }
      } else {
        return { status: false, result: "Error setting up request:" + error.message }
      }
    } else {
      return { status: false, result: "Unexpected error:" + error }
    }
  }
};

export const createTodo = async (data) => {
  try {
    const result = await API.post("/todo", {
      order: data.order,
      description: data.description,
      name: data.name,
    });
    if (result.status === 201) {
      return { status: true, result };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return { status: false, result: error.response.data.message || error.message }
      } else if (error.request) {
        return { status: false, result: "No response from server" }
      } else {
        return { status: false, result: "Error setting up request:" + error.message }
      }
    } else {
      return { status: false, result: "Unexpected error:" + error }
    }
  }
};

export const updateOrderTodo = async (dataOrder) => {
  try {
    const body = dataOrder.map(({ id, order }) => ({ id, order }))
    const result = await API.put(`/todo`, body);
    if (result.status === 201) {
      return { status: true, result };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return { status: false, result: error.response.data.message || error.message }
      } else if (error.request) {
        return { status: false, result: "No response from server" }
      } else {
        return { status: false, result: "Error setting up request:" + error.message }
      }
    } else {
      return { status: false, result: "Unexpected error:" + error }
    }
  }
};

export const updateTodo = async ({ id, data }) => {
  try {
    const result = await API.patch(`/todo/${id}`, data);
    if (result.status === 200) {
      return { status: true, result };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return { status: false, result: error.response.data.message || error.message }
      } else if (error.request) {
        return { status: false, result: "No response from server" }
      } else {
        return { status: false, result: "Error setting up request:" + error.message }
      }
    } else {
      return { status: false, result: "Unexpected error:" + error }
    }
  }
};

export const deleteTodo = async (id) => {
  try {
    const result = await API.delete(`/todo/${id}`);
    if (result.status === 201) {
      return { status: true, result };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return { status: false, result: error.response.data.message || error.message }
      } else if (error.request) {
        return { status: false, result: "No response from server" }
      } else {
        return { status: false, result: "Error setting up request:" + error.message }
      }
    } else {
      return { status: false, result: "Unexpected error:" + error }
    }
  }
};
