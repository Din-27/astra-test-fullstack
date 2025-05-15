import { useState } from "react";
import {
  createTodo,
  deleteTodo,
  getTodoById,
  getTodos,
  updateOrderTodo,
  updateTodo,
} from "../api";
import { toast } from "react-toastify";
import { useEffect } from "react";

export const useTodo = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
  });
  const [dropdown, setDropdown] = useState({ condtion: false, id: null });
  const [modal, setModal] = useState({ display: false, type: "" });

  const handleOption = (index) => {
    setDropdown((prev) => {
      return {
        ...prev,
        id: index,
        condtion: !prev.condtion,
      };
    });
  };

  const handleOffOption = () => {
    setDropdown((prev) => ({
      ...prev,
      condtion: !prev.condtion,
    }));
  };

  const handleModalAdd = () => {
    setModal((prev) => ({
      ...prev,
      display: !prev.display,
      type: !prev.display ? "add" : "",
    }));
    setForm({
      name: "",
      description: "",
    });
  };

  const handleOffModalEdit = () => {
    setModal((prev) => ({
      ...prev,
      display: !prev.display,
      type: !prev.display ? "edit" : "",
    }));
    setForm({
      name: "",
      description: "",
    });
    setDropdown({
      condtion: false,
      id: null,
    });
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditItem = async (item) => {
    const result = await getTodoById(item.id);
    if (result.status === 200) {
      setForm({
        ...form,
        id: result.data.id,
        name: result.data.name,
        description: result.data.description,
      });
      setModal((prev) => ({
        ...prev,
        display: !prev.display,
        type: !prev.display ? "edit" : "",
      }));
    } else {
      toast.error(result);
    }
  };

  const handleGetTodos = async () => {
    const result = await getTodos();
    if (result.status === 200) {
      setData(result.data);
    } else {
      toast.error(result);
    }
  };

  const handleCreateTodo = async (e) => {
    e.preventDefault();
    const result = await createTodo({
      ...form,
      order: data.length + 1,
    });
    if (result.status === 200) {
      await handleGetTodos();
      handleModalAdd();
    } else {
      toast.error(result);
    }
  };

  const handleUpdateOrderTodo = async (dataOrder) => {
    const result = await updateOrderTodo(dataOrder);
    if (result.status === 201) {
      handleGetTodos();
    } else {
      toast.error(result);
    }
  };

  const handleUpdateTodo = async (id, e) => {
    e.preventDefault();
    const result = await updateTodo({ id: form.id, data: form });
    if (result.status === 200) {
      handleGetTodos();
      handleOffModalEdit();
    } else {
      toast.error(result);
    }
  };

  const handleDeleteTodo = async (id, e) => {
    e.preventDefault();
    const result = await deleteTodo(id);
    if (result.status === 200) {
      handleGetTodos();
      setDropdown({
        condtion: false,
        id: null,
      });
    } else {
      toast.error(result);
    }
  };

  useEffect(() => {
    handleGetTodos();
  }, []);

  return {
    handleOffOption,
    handleDeleteTodo,
    handleUpdateTodo,
    handleUpdateOrderTodo,
    handleCreateTodo,
    handleGetTodos,
    handleEditItem,
    handleChange,
    handleOption,
    handleModalAdd,
    handleOffModalEdit,
    dropdown,
    modal,
    form,
    data,
  };
};
