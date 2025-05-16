import { Request, Response } from "express";

type TData = {
  id: number;
  title: string;
  description: string;
};

type TCreateData = Omit<TData, "id">;

const data: Array<TData> = [];

export const getDatas = (_: Request, res: Response) => {
  return res.status(200).send(data);
};

export const createData = (
  req: Request<{}, {}, TCreateData>,
  res: Response
) => {
  try {
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
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error service" });
  }
};

export const deleteData = (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const index = data.findIndex((item) => item.id === Number(id));
    if (index === -1) {
      return res
        .status(404)
        .send({ message: `data with id: ${id} not found !` });
    }
    data.splice(index, 1);
    res.status(200).send({ message: "Data deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error service" });
  }
};

export const updateData = (
  req: Request<{ id: string }, {}, TCreateData>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const index = data.findIndex((item) => item.id === Number(id));
    if (index === -1) {
      return res
        .status(404)
        .send({ message: `data with id: ${id} not found !` });
    }
    data[index].description = description;
    data[index].title = title;
    return res.status(200).send({ message: "Success update data" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error service" });
  }
};
