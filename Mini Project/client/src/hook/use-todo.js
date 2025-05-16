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
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    name: "",
    description: "",
  });
  const [dropdown, setDropdown] = useState({ condtion: false, id: null });
  const [modal, setModal] = useState({ display: false, type: "" });
  const [drawer, setDrawer] = useState({ display: false, data: null });

  const handleOption = (index) => {
    setDropdown((prev) => {
      return {
        ...prev,
        id: index,
        condtion: !prev.condtion,
      };
    });
  };

  const handleLoading = (action) => {
    setLoading(action);
  };

  const handleDrawer = async (id) => {
    let result = null;
    if (typeof id === "number") {
      result = await getTodoById(id);
    }
    setDropdown((prev) => ({
      ...prev,
      condtion: false,
    }));
    setDrawer((prev) => ({
      ...prev,
      display: !prev.display,
      data: result ? result.result.data : null,
    }));
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
    if (result.status) {
      setForm({
        ...form,
        id: result.result.data.id,
        name: result.result.data.name,
        description: result.result.data.description,
      });
      setModal((prev) => ({
        ...prev,
        display: !prev.display,
        type: !prev.display ? "edit" : "",
      }));
    } else {
      toast.error(result.result);
    }
  };

  const handleGetTodos = async () => {
    setLoading(true)
    try {
      const result = await getTodos();
      if (result.status) {
        setData(result.result.data);
      } else {
        toast.error(result.result);
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message)
    } finally {
      setLoading(false)
    }
  };

  const handleCreateTodo = async (e) => {
    e.preventDefault();
    const result = await createTodo(form);
    if (result.status) {
      await handleGetTodos();
      handleModalAdd();
      toast.success('Success create Todo');
    } else {
      toast.error(result.result);
    }
  };

  const handleUpdateOrderTodo = async (dataOrder) => {
    const result = await updateOrderTodo(dataOrder);
    if (result.status) {
      handleGetTodos();
    } else {
      toast.error(result.result);
    }
  };

  const handleUpdateTodo = async (id, e) => {
    e.preventDefault();
    const result = await updateTodo({ id: form.id, data: form });
    if (result.status) {
      handleGetTodos();
      handleOffModalEdit();
      toast.success('Success edit Todo');
    } else {
      toast.error(result.result);
    }
  };

  const handleDeleteTodo = async (id, e) => {
    e.preventDefault();
    const result = await deleteTodo(id);
    if (result.status) {
      handleGetTodos();
      setDropdown({
        condtion: false,
        id: null,
      });
      toast.success('Success delete Todo');
    } else {
      toast.error(result.result);
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
    handleDrawer,
    handleLoading,
    dropdown,
    loading,
    drawer,
    modal,
    form,
    data,
  };
};
