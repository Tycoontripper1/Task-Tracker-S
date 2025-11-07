import express from "express";
const router = express.Router();
import { addTask } from "../src/controllers/task.js";
import { updateTask } from "../src/controllers/task.js";
import { getAllTasks } from "../src/controllers/task.js";

// add Task

router.post("/add", addTask);
// update Task
router.put("/update/:id", updateTask);
// get all Tasks
router.get("/all", getAllTasks);
export default router;
