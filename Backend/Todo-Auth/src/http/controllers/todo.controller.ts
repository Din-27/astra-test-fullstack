import { Request, Response } from "express";
import ITodo from "../../libs/interfaces/Todo";

const todos: Array<ITodo> = [];

type TCreateTodo = Omit<ITodo, "id">;

export const getTodos = async (
  _: Request,
  res: Response<Array<ITodo> | { message: string }>
) => {
  try {
    return res.status(200).send(todos);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error" });
  }
};

export const getTodoById = async (
  req: Request<{ id: string }>,
  res: Response<ITodo | { message: string } | {}>
) => {
  const { id } = req.params;
  try {
    const filter = todos.find((item) => item.id === Number(id));
    return res.status(200).send(filter || {});
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error" });
  }
};

export const createTodo = async (
  req: Request<{}, {}, TCreateTodo>,
  res: Response<{ message: string }>
) => {
  const { completed, title } = req.body;
  try {
    const filter = todos.find((item) => item.title === title);
    if (filter) {
      return res
        .status(409)
        .send({ message: `todo with title: ${filter.title}, already exist !` });
    }

    const getLastId =
      todos.length >= 1 ? Math.max(...todos.map((item) => item.id)) + 1 : 1;

    todos.push({
      id: getLastId,
      completed,
      title,
    });
    return res.status(201).send({ message: "todos success created" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error" });
  }
};

export const updateTodo = async (
  req: Request<{ id: string }, {}, TCreateTodo>,
  res: Response<{ message: string }>
) => {
  const { id } = req.params;
  const { completed, title } = req.body;
  try {
    const filter = todos.find((item) => item.id === Number(id));
    if (!filter) {
      return res
        .status(404)
        .send({ message: `todo with id: ${id}, not found !` });
    }
    const filterName = todos.find(
      (item) => item.title === title && item.id !== Number(id)
    );
    if (filterName) {
      return res.status(409).send({
        message: `todo with title: ${filterName.title}, already exist !`,
      });
    }
    const index = todos.findIndex((item) => item.id === Number(id));
    if (index !== -1) {
      todos[index].completed = completed;
      todos[index].title = title;
    }
    return res.status(201).send({ message: "todos success updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error" });
  }
};

export const deleteTodo = async (
  req: Request<{ id: string }>,
  res: Response<{ message: string }>
) => {
  const { id } = req.params;
  try {
    const filter = todos.find((item) => item.id === Number(id));
    if (!filter) {
      return res
        .status(404)
        .send({ message: `todo with id: ${id}, not found !` });
    }
    const index = todos.findIndex((item) => item.id === Number(id));
    if (index !== -1) {
      todos.splice(index, 1);
    }
    return res.status(201).send({ message: "todos success deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error" });
  }
};
