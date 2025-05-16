import { Context } from "koa";
import { ITodo } from "../../libs/interfaces/todo";
import { TData, TodoRepository } from "../../libs/repository/todo.repository";

export const getTodos = async (ctx: Context) => {
  try {
    const todoRepo = new TodoRepository();
    const data = await todoRepo.findAll();
    ctx.status = 200;
    ctx.body = data;
    return;
  } catch (error) {
    console.log(error);
    throw new Error("Server Error");
  }
};

export const getTodoById = async (ctx: Context) => {
  try {
    const { id } = ctx.params;
    const todoRepo = new TodoRepository();
    const data = await todoRepo.findOne({ where: { id: Number(id) } });
    ctx.status = 200;
    ctx.body = data;
    return;
  } catch (error) {
    console.log(error);
    console.log(error);
    throw new Error("Server Error");
  }
};

export const createTodo = async (ctx: Context) => {
  try {
    const { name, description, order } = ctx.request.body as TData;
    const todoRepo = new TodoRepository();
    const todo = await todoRepo.findOne({ where: { name: String(name) } });
    if (todo) {
      ctx.status = 409;
      ctx.body = { message: `Todo with name: ${name}, already exist !` };
      return;
    }
    const data = await todoRepo.create({
      data: {
        description,
        name,
        order,
      },
    });
    ctx.status = 200;
    ctx.body = data;
    return;
  } catch (error) {
    console.log(error);
    throw new Error("Server Error");
  }
};

export const updateTodo = async (ctx: Context) => {
  try {
    const { id } = ctx.params;
    const { name, description } = ctx.request.body as TData;
    const todoRepo = new TodoRepository();
    const todo = await todoRepo.findOne({ where: { id: Number(id) } });
    if (!todo) {
      ctx.status = 404;
      ctx.body = { message: `Todo with id: ${id}, Not Found !` };
      return;
    }
    const data = await todoRepo.update({
      where: { id: Number(id) },
      data: {
        description,
        name,
        order: Number(todo?.order),
      },
    });
    ctx.status = 200;
    ctx.body = data;
    return;
  } catch (error) {
    console.log(error);
    throw new Error("Server Error");
  }
};

export const updateOrderTodo = async (ctx: Context) => {
  try {
    const body = ctx.request.body as Array<ITodo>;
    const todoRepo = new TodoRepository();
    for (const item of body) {
      const { id, name, description, order } = item;
      await todoRepo.update({
        where: { id },
        data: {
          description,
          name,
          order,
        },
      });
    }
    ctx.status = 201;
    return;
  } catch (error) {
    console.log(error);
    throw new Error("Server Error");
  }
};

export const deleteTodo = async (ctx: Context) => {
  try {
    const { id } = ctx.params;
    const todoRepo = new TodoRepository();
    const todo = await todoRepo.findOne({ where: { id: Number(id) } });
    if (!todo) {
      ctx.status = 404;
      ctx.body = { message: `Todo with id: ${id}, Not Found !` };
      return;
    }
    const data = await todoRepo.destroy({
      where: { id: Number(id) },
    });
    ctx.status = 200;
    ctx.body = data;
    return;
  } catch (error) {
    console.log(error);
    throw new Error("Server Error");
  }
};
