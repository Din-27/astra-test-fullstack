import { PrismaClient } from "../../../generated/prisma";
import { ITodo } from "../interfaces/todo";
const prisma = new PrismaClient();

export type TData = Omit<ITodo, "id">;

export class TodoRepository {
  async findAll() {
    try {
      return await prisma.todos.findMany({
        orderBy: {
          order: "asc",
        },
      });
    } catch (error) {
      console.log(error);
      throw new Error("Error Database");
    }
  }

  async findOne(props: { where: { id?: number; name?: string } }) {
    try {
      return await prisma.todos.findFirst({
        where: props.where,
      });
    } catch (error) {
      console.log(error);
      throw new Error("Error Database");
    }
  }

  async create(props: { data: TData }) {
    try {
      return await prisma.todos.create({
        data: {
          ...props.data,
        },
      });
    } catch (error) {
      console.log(error);
      throw new Error("Error Database");
    }
  }

  async update(props: { where: { id: number }; data: TData }) {
    try {
      return await prisma.todos.update({
        where: props.where,
        data: props.data,
      });
    } catch (error) {
      console.log(error);
      throw new Error("Error Database");
    }
  }

  async destroy(props: { where: { id: number } }) {
    try {
      return await prisma.todos.delete({
        where: props.where,
      });
    } catch (error) {
      console.log(error);
      throw new Error("Error Database");
    }
  }
}
