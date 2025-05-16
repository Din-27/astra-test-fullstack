import Joi from "joi";

export const TodoByIdSchema = Joi.object({
  id: Joi.number().required(),
});

export const CreateTodoSchema = Joi.object({
  title: Joi.string().min(1).required(),
  description: Joi.string().min(1).required(),
});

export const UpdateTodoSchema = Joi.object({
  id: Joi.number().required(),
  title: Joi.string().min(1).required(),
  description: Joi.string().min(1).required(),
});

export const DeleteTodoSchema = Joi.object({
  id: Joi.number().required(),
});
