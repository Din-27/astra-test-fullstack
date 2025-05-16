import { Request, Response } from "express";
import IUser from "../../libs/interfaces/User";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import Joi from "joi";

const users: Array<IUser> = [];
type TCreateUser = Omit<IUser, "id">;

export const login = async (
  req: Request<{}, {}, TCreateUser>,
  res: Response
) => {
  try {
    const { username, password } = req.body;
    const user = users.find((item) => item.username === username);
    if (!user) {
      return res
        .status(404)
        .send({ message: "user not found, username or password is wrong!" });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res
        .status(404)
        .send({ message: "username or password is wrong!" });
    }
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      process.env.SECRET_KEY as string,
      {
        expiresIn: "3h",
      }
    );
    return res.status(200).send({
      message: "Success Login",
      user: username,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Server Error",
    });
  }
};

export const register = async (
  req: Request<{}, {}, TCreateUser>,
  res: Response
) => {
  try {
    const { username, password } = req.body;
    const user = users.find((item) => item.username === username);
    if (user) {
      return res
        .status(409)
        .send({ message: "user already exist, please login!" });
    }
    const getLastId =
      users.length > 0 ? Math.max(...users.map((item) => item.id)) : 1;
    const hashPassword = bcrypt.hashSync(password, 10);
    users.push({
      id: getLastId,
      username,
      password: hashPassword,
    });
    const token = jwt.sign(
      {
        id: getLastId,
        username: username,
      },
      process.env.SECRET_KEY as string,
      {
        expiresIn: "3h",
      }
    );
    return res.status(200).send({
      message: "Success Register",
      user: username,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Server Error",
    });
  }
};

export const getProfile = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.user;
    const user = users.find((item) => item.id === id);
    if (!user) {
      return res.status(404).send({ message: "user not found !" });
    }
    return res.status(200).send({ id: user.id, username: user.username });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Server Error",
    });
  }
};
