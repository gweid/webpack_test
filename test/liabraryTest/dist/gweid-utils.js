(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
    // 支持 node 的 CommomJs 环境，也就是 commomjs(2)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
    // 支持 amd
		define([], factory);
	else if(typeof exports === 'object')
    // 支持社区的 CommomJs 环境
		exports["gweidUtils"] = factory();
	else
    // 支持浏览器
		root["gweidUtils"] = factory();
})(this, function() { // 这个 this 由 globalObject 设置
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/lib/format.js":
/*!***************************!*\
  !*** ./src/lib/format.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dateFormat": function() { return /* binding */ dateFormat; },
/* harmony export */   "priceFormat": function() { return /* binding */ priceFormat; }
/* harmony export */ });
const dateFormat = (date) => {
  return "2020-12-12";
}

const priceFormat = (price) => {
  return "100.00";
}


/***/ }),

/***/ "./src/lib/math.js":
/*!*************************!*\
  !*** ./src/lib/math.js ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sum": function() { return /* binding */ sum; },
/* harmony export */   "mul": function() { return /* binding */ mul; }
/* harmony export */ });
const sum = (num1, num2) => {
  return num1 + num2;
}

const mul = (num1, num2) => {
  return num1 * num2;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "math": function() { return /* reexport module object */ _lib_math__WEBPACK_IMPORTED_MODULE_0__; },
/* harmony export */   "format": function() { return /* reexport module object */ _lib_format__WEBPACK_IMPORTED_MODULE_1__; }
/* harmony export */ });
/* harmony import */ var _lib_math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/math */ "./src/lib/math.js");
/* harmony import */ var _lib_format__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/format */ "./src/lib/format.js");




}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});