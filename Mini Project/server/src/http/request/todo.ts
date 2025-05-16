import Joi from "joi";

export const TodoByIdSchema = Joi.object({
  id: Joi.number().required(),
});

export const CreateTodoSchema = Joi.object({
  name: Joi.string().min(1).required(),
  description: Joi.string().min(1).required(),
});

export const UpdateTodoSchema = Joi.object({
  id: Joi.number().required(),
  description: Joi.string().min(1).required(),
  name: Joi.string().min(1).required(),
});

export const UpdateTodoOrderSchema = Joi.array().items(
  Joi.object({
    id: Joi.number().required(),
    order: Joi.number().required(),
  })
);
