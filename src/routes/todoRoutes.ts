import Express from "express";
import { createTodo, validateTodoCreation } from "../controllers/todoControllers";

const router = Express.Router();

router.post("/", validateTodoCreation, createTodo);

export default router