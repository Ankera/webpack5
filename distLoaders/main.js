/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./loaders/inline1-loader.js!./loaders/inline2-loader.js!./src/titleLoader.js":
/*!************************************************************************************!*\
  !*** ./loaders/inline1-loader.js!./loaders/inline2-loader.js!./src/titleLoader.js ***!
  \************************************************************************************/
/***/ (function(module) {

eval("module.exports = {\n  title: 'title',\n  age: 18\n}//pre2//pre1//normal2//normal1//inline2//inline1//post2//post1\n\n//# sourceURL=webpack://webpack5/./src/titleLoader.js?./loaders/inline1-loader.js!./loaders/inline2-loader.js");

/***/ }),

/***/ "./src/indexLoader.js":
/*!****************************!*\
  !*** ./src/indexLoader.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

eval("const title = __webpack_require__(/*! inline1-loader!inline2-loader!./titleLoader */ \"./loaders/inline1-loader.js!./loaders/inline2-loader.js!./src/titleLoader.js\");\n\nconsole.log('titleLoader', title);\n\nconst sum = (a, b) => a + b;\n\nconsole.log('求和sum', sum(1, 2));//pre2//pre1//normal2//normal1//post2//post1\n\n//# sourceURL=webpack://webpack5/./src/indexLoader.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/indexLoader.js");
/******/ 	
/******/ })()
;