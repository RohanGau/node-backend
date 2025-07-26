import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import Todo from "../models/todoConfiguration";
import { createTodoSchema } from "../validation/todo";
import { ERROR_MESSAGES } from "../utils";

export const validateTodoCreation = (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = createTodoSchema.validate(req.body, { abortEarly: false });
    if(error) {
        const erros = error.details.map(detail => ({
            field: detail.path.join("."),
            message: detail.message.replace(/"/g, ''),
        }))
        return res.status(400).json({ msg: ERROR_MESSAGES.VALIDATION_ERROR, error: erros});
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
            return res.status(500).json({ msg: ERROR_MESSAGES.TITLE_EXISTS });
        }
        res.status(500).json({ error: ERROR_MESSAGES.CREATE_FAILED });
    }
};

export const getAllTodos = async (_req: Request, res: Response) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch(err: any) {
        res.status(500).json({ error: ERROR_MESSAGES.FETCH_FAILED  });
    }
}

export const updateTodo = async(req: Request, res: Response) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({ error: ERROR_MESSAGES.INVALID_ID_FOND })
    }
    try {
        const updated = await Todo.findByIdAndUpdate(
            req.params.id,
            req.validatedBody,
            { new: true }
        );
        if(!updated) {
            res.status(404).json({ error : ERROR_MESSAGES.TODO_NOT_FOUND })
        }
        res.status(200).json(updated);
    } catch(err: any) {
        res.status(500).json({ error: ERROR_MESSAGES.UPDATE_FAILED });
    }
}

export const deleteTodo = async(req: Request, res: Response) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({ error: ERROR_MESSAGES.INVALID_ID_FOND });
    }
    try {
        const deleteRes = await Todo.findByIdAndDelete(req.params.id);
        if(!deleteRes) {
            return res.status(404).json({ error: ERROR_MESSAGES.TODO_NOT_FOUND });
        }
        console.log("res :", deleteRes);
        res.status(204).send();
    } catch(err: any) {
        res.status(500).json({ error: ERROR_MESSAGES.DELETE_FAILED });
    } 
}

