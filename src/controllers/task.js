import taskShema from "../models/task.js";
import jwt from "jsonwebtoken";

export const addTask = (req, res) => {
  const { title, description, dueDate, status } = req.body;
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }
  //   verify token

  jwt.verify(token, "task#tracker", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const newTask = new taskShema({
      title,
      description,
      dueDate,
      status,
    });
    newTask
      .save()
      .then((task) => {
        res.status(201).json({ message: "Task added successfully", task });
      })
      .catch((error) => {
        res.status(500).json({ message: "Error adding task", error });
      });
  });
};

// update task
export const updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, status } = req.body;
  taskShema
    .findByIdAndUpdate(
      id,
      { title, description, dueDate, status },
      { new: true }
    )
    .then((task) => {
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.status(200).json({ message: "Task updated successfully", task });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error updating task", error });
    });
};

// get all tasks
export const getAllTasks = (req, res) => {
  taskShema
    .find()
    .then((tasks) => {
      res.status(200).json({ tasks });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error fetching tasks", error });
    });
};
