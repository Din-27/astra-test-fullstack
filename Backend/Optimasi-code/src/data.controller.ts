import { Request, Response } from "express";

type TData = {
  id: number;
  title: string;
  description: string;
};

type TCreateData = Omit<TData, "id">;

const data: Array<TData> = [];

export const getDatas = (req: Request, res: Response) => {
  return res.status(200).send(data);
};

export const createData = (
  req: Request<{}, {}, TCreateData>,
  res: Response
) => {
  const newData = req.body;
  const id = data.length > 0 ? Math.max(...data.map((item) => item.id)) : 1;
  const index = data.findIndex((item) => item.id === Number(id));
  if (index !== -1) {
    return res
      .status(404)
      .send({ message: `data with id: ${id}, already exist !` });
  }
  data.push({ ...newData, id });
  res.status(200).send({ message: "Data created" });
};

export const deleteData = (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const index = data.findIndex((item) => item.id === Number(id));
  if (index === -1) {
    return res.status(404).send({ message: `data with id: ${id} not found !` });
  }
  data.splice(index, 1);
  res.status(200).send({ message: "Data deleted" });
};

export const updateData = (
  req: Request<{ id: string }, {}, TCreateData>,
  res: Response
) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const index = data.findIndex((item) => item.id === Number(id));
  if (index === -1) {
    return res.status(404).send({ message: `data with id: ${id} not found !` });
  }
  data[index].description = description;
  data[index].title = title;
  return res.status(200).send({ message: "Success update data" });
};
