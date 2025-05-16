import { Context } from "koa";
import { ITodo } from "../../libs/interfaces/todo";
import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient();

export type TData = Omit<ITodo, "id">;

export const getTodos = async (ctx: Context) => {
  try {
    const data = await prisma.todos.findMany({ orderBy: { order: "asc" } });
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
    const data = await prisma.todos.findFirst({ where: { id: Number(id) } });
    ctx.status = 200;
    ctx.body = data;
    return;
  } catch (error) {
    console.log(error);
    throw new Error("Server Error");
  }
};

export const createTodo = async (ctx: Context) => {
  try {
    const { name, description } = ctx.request.body as TData;
    const todo = await prisma.todos.findFirst({
      where: { name: String(name) },
    });
    if (todo) {
      ctx.status = 409;
      ctx.body = { message: `Todo with name: ${name}, already exist !` };
      return;
    }
    await prisma.$transaction(async (tx) => {
      const itemTodoCount = await tx.todos.count();
      await tx.todos.create({
        data: {
          description,
          name,
          order: itemTodoCount + 1,
        },
      });
    });
    ctx.status = 201;
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
    const todo = await prisma.todos.findFirst({ where: { id: Number(id) } });
    if (!todo) {
      ctx.status = 404;
      ctx.body = { message: `Todo with id: ${id}, Not Found !` };
      return;
    }
    const todoName = await prisma.todos.findFirst({
      where: { AND: [{ id: Number(id) }, { name }] },
    });
    if (!todoName) {
      ctx.status = 404;
      ctx.body = { message: `Todo with name: ${name}, Already Exist !` };
      return;
    }
    await prisma.$transaction(async (tx) => {
      await tx.todos.update({
        where: { id: Number(id) },
        data: {
          description,
          name,
          order: Number(todo?.order),
        },
      });
    });
    ctx.status = 200;
    return;
  } catch (error) {
    console.log(error);
    throw new Error("Server Error");
  }
};

export const updateOrderTodo = async (ctx: Context) => {
  try {
    const body = ctx.request.body as Array<ITodo>;
    await prisma.$transaction(async (tx) => {
      for (const item of body) {
        const { id, order } = item;
        await tx.todos.update({
          where: { id },
          data: {
            order,
          },
        });
      }
    });
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
    const todo = await prisma.todos.findFirst({ where: { id: Number(id) } });
    if (!todo) {
      ctx.status = 404;
      ctx.body = { message: `Todo with id: ${id}, Not Found !` };
      return;
    }
    await prisma.$transaction(async (tx) => {
      await tx.todos.delete({
        where: { id: Number(id) },
      });
      const todos = await tx.todos.findMany();
      await Promise.all(
        todos.map((item, index) =>
          tx.todos.update({
            where: { id: item.id },
            data: {
              order: index + 1,
            },
          })
        )
      );
    });
    ctx.status = 201;
    return;
  } catch (error) {
    console.log(error);
    throw new Error("Server Error");
  }
};
