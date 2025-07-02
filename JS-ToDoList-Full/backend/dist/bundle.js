/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!******************!*\
  !*** ./index.ts ***!
  \******************/

const express = __webpack_require__(/*! express */ "express");
const cors = __webpack_require__(/*! cors */ "cors"); // Import CORS middleware
const app = express();
const port = 3000;
const tasks = [];
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
    tasks.push(jsonData.task);
    res.status(201).send({ message: "Task added successfully", jsonData });
});
app.delete("/tasks/:task", (req, res) => {
    const taskToDelete = req.params.task;
    console.log("taskToDelete:", taskToDelete); // Log the task to be deleted
    const index = tasks.indexOf(taskToDelete);
    if (index > -1) {
        tasks.splice(index, 1); // Remove the task from the array
        res.status(200).send({ message: "Task deleted successfully" });
    }
    else {
        res.status(404).send({ message: "Task not found" });
    }
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
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
    }
    else {
        res.status(404).send({ message: "Task not found" });
    }
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map