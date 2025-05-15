import axios from "axios";
import { API } from "../configs/api";

export const getTodoById = async (id) => {
  try {
    const result = await API.get(`/todo/${id}`);
    if (result.status === 200) {
      return result;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return error.response.data || error.message;
      } else if (error.request) {
        return "No response from server";
      } else {
        return "Error setting up request:" + error.message;
      }
    } else {
      return "Unexpected error:" + error;
    }
  }
};

export const getTodos = async () => {
  try {
    const result = await API.get("/todo");
    if (result.status === 200) {
      return result;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return error.response.data || error.message;
      } else if (error.request) {
        return "No response from server";
      } else {
        return "Error setting up request:" + error.message;
      }
    } else {
      return "Unexpected error:" + error;
    }
  }
};

export const createTodo = async (data) => {
  try {
    const result = await API.post("/todo", data);
    if (result.status === 200) {
      return result;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return error.response.data || error.message;
      } else if (error.request) {
        return "No response from server";
      } else {
        return "Error setting up request:" + error.message;
      }
    } else {
      return "Unexpected error:" + error;
    }
  }
};

export const updateOrderTodo = async (dataOrder) => {
  try {
    const result = await API.patch(`/todo`, dataOrder);
    if (result.status === 201) {
      return result;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return error.response.data || error.message;
      } else if (error.request) {
        return "No response from server";
      } else {
        return "Error setting up request:" + error.message;
      }
    } else {
      return "Unexpected error:" + error;
    }
  }
};

export const updateTodo = async ({ id, data }) => {
  try {
    const result = await API.put(`/todo/${id}`, data);
    if (result.status === 200) {
      return result;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return error.response.data || error.message;
      } else if (error.request) {
        return "No response from server";
      } else {
        return "Error setting up request:" + error.message;
      }
    } else {
      return "Unexpected error:" + error;
    }
  }
};

export const deleteTodo = async (id) => {
  try {
    const result = await API.delete(`/todo/${id}`);
    if (result.status === 200) {
      return result;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return error.response.data || error.message;
      } else if (error.request) {
        return "No response from server";
      } else {
        return "Error setting up request:" + error.message;
      }
    } else {
      return "Unexpected error:" + error;
    }
  }
};
