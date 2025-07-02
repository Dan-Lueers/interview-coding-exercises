const express = require("express");
const app = express();
const port = 3000;

const tasks = [];

app.get("/", (req, res) => {
  res.send("sadasdasda");
});

app.post("/tasks", (req, res) => {
  let task = req.body.task;
  if (!task) {
    return res.status(400).send("Task is required");
  }
  tasks.push(task);
  res.status(201).send({ message: "Task added successfully", task });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
