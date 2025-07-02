import express, { Request, Response } from "express";

import cors from "cors"; // Import CORS middleware
const app = express();
const port = 3000;

const tasks: Task[] = [];

interface Task {
  name: string;
  done: boolean;
  id: number;
}

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies

app.get("/tasks", (req, res) => {
  // Send the tasks array as a JSON response
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const jsonData = req.body; // Access the parsed JSON data

  // If you want to send a response back, you can do so like this:
  if (!jsonData || !jsonData.task) {
    return res.status(400).send("Task is required");
  }

  // Assuming the task is sent in the body as { "task": "your task" }
  console.log(jsonData.task); // Log the data to the console

  // Add the task to the tasks array
  const task: Task = {
    name: jsonData.task,
    done: false, // Default value for done
    id: Date.now() + Math.floor(Math.random() * 1000), // Generate a more unique ID
  };
  tasks.push(task);

  res.status(201).send({ message: "Task added successfully", task });
});

app.delete("/tasks/:task", (req, res) => {
  const taskToDelete = req.params.task;
  console.log("taskToDelete:", taskToDelete); // Log the task to be deleted
  const index = tasks.indexOf(taskToDelete);
  if (index > -1) {
    tasks.splice(index, 1); // Remove the task from the array
    res.status(200).send({ message: "Task deleted successfully" });
  } else {
    res.status(404).send({ message: "Task not found" });
  }
});

app.put("/tasks/:task", (req, res) => {
  const taskToUpdate = req.params.task;
  const newTask = req.body.task; // Assuming the new task is sent in the body

  const index = tasks.indexOf(taskToUpdate);
  if (index > -1) {
    tasks[index] = newTask; // Update the task in the array
    res
      .status(200)
      .send({ message: "Task updated successfully", task: newTask });
  } else {
    res.status(404).send({ message: "Task not found" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
