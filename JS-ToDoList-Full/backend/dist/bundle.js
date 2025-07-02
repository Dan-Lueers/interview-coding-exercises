/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("var express = __webpack_require__(/*! express */ \"express\");\nvar cors = __webpack_require__(/*! cors */ \"cors\"); // Import CORS middleware\nvar app = express();\nvar port = 3000;\nvar tasks = [];\napp.use(cors()); // Enable CORS for all routes\napp.use(express.json()); // Middleware to parse JSON bodies\n\napp.get(\"/tasks\", function (req, res) {\n  // Send the tasks array as a JSON response\n  res.json(tasks);\n});\napp.post(\"/tasks\", function (req, res) {\n  var jsonData = req.body; // Access the parsed JSON data\n\n  // If you want to send a response back, you can do so like this:\n  if (!jsonData || !jsonData.task) {\n    return res.status(400).send(\"Task is required\");\n  }\n\n  // Assuming the task is sent in the body as { \"task\": \"your task\" }\n  console.log(jsonData.task); // Log the data to the console\n\n  // Add the task to the tasks array\n  tasks.push(jsonData.task);\n  res.status(201).send({\n    message: \"Task added successfully\",\n    jsonData: jsonData\n  });\n});\napp.listen(port, function () {\n  console.log(\"Server is running at http://localhost:\".concat(port));\n});\n\n//# sourceURL=webpack://todo-backend/./index.js?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("cors");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;