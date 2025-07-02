const express = require("express");
const cors = require("cors"); // Import CORS middleware
const app = express();
const port = 3000;

const tasks = [];

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies

app.get("/", (req, res) => {
  res.send("bbbbb");
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
  tasks.push(jsonData.task);

  res.status(201).send({ message: "Task added successfully", jsonData });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
