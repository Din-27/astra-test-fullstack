import { PrismaClient } from "../../../generated/prisma";
import { ITodo } from "../interfaces/todo";
const prisma = new PrismaClient();

export type TData = Omit<ITodo, "id">;

export class TodoRepository {
  async findAll() {
    return await prisma.todos.findMany({
      orderBy: {
        order: "asc",
      },
    });
  }

  async findOne(props: { where: { id?: number; name?: string } }) {
    return await prisma.todos.findFirst({
      where: props.where,
    });
  }

  async create(props: { data: TData }) {
    return await prisma.todos.create({
      data: {
        ...props.data,
      },
    });
  }

  async update(props: { where: { id: number }; data: TData }) {
    return await prisma.todos.update({
      where: props.where,
      data: props.data,
    });
  }

  async destroy(props: { where: { id: number } }) {
    return await prisma.todos.delete({
      where: props.where,
    });
  }
}
