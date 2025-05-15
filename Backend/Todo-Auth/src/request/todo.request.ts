import Joi from "joi";

export const GetTodoByIdSchema = Joi.object({
  id: Joi.number().required(),
});

export const CreateTodoSchema = Joi.object({
  completed: Joi.boolean().required(),
  title: Joi.string().min(1).required(),
});

export const UpdateTodoSchema = Joi.object({
  id: Joi.number().required(),
  completed: Joi.boolean().required(),
  title: Joi.string().min(1).required(),
});

export const DeleteTodoSchema = Joi.object({
  id: Joi.number().required(),
});
