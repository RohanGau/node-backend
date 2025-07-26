import Express from "express";
import { createTodo, validateTodoCreation, getAllTodos, updateTodo, deleteTodo } from "../controllers/todoControllers";

const router = Express.Router();

router.post("/", validateTodoCreation, createTodo);
router.get("/", getAllTodos);
router.put("/:id", validateTodoCreation, updateTodo);
router.delete("/:id", deleteTodo);

export default router