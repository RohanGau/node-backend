import { Request, Response, NextFunction } from "express";
import Todo from "../models/todoConfiguration";
import { createTodoSchema } from "../validation/todo";

export const validateTodoCreation = (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = createTodoSchema.validate(req.body, { abortEarly: false });
    if(error) {
        const erros = error.details.map(detail => ({
            field: detail.path.join("."),
            message: detail.message.replace(/"/g, ''),
        }))
        return res.status(400).json({ msg: 'Validation Error ', error: erros});
    }
    req.validatedBody = value;
    next();
}

export const createTodo = async(req: Request, res: Response) => {
    try {
        const { title, description } = req.validatedBody;
        const newTodo = new Todo({
            title: title,
            description: description
        });
        const item = await newTodo.save();
        return res.status(201).json(item);
    } catch(err: any) {
        console.error(err.message);
        if(err.code === 11000) {
            return res.status(500).json({ msg: "title alreadt exists. Please choose a different title."});
        }
        res.status(500).json({ error: "Failed to create todo "});
    }
};