// 外部是一个自执行函数
;(function () {
  'use strict'
  // 定义一个对象，用于存储模块
  // 模块路径作为对象 key 值
  var __webpack_modules__ = {
    './src/js/math.js': function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      // 调用 __webpack_require__.r，记录 __esModule 为 true
      __webpack_require__.r(__webpack_exports__)

      // 调用 __webpack_require__.d，将 exports 没有的代理到 { sum: Function, mul: Function }
      __webpack_require__.d(__webpack_exports__, {
        sum: function () {
          return sum
        },
        mul: function () {
          return mul
        }
      })

      const sum = (num1, num2) => {
        return num1 + num2
      }

      const mul = (num1, num2) => {
        return num1 * num2
      }
    }
  }

  // 这个对象用于缓存加载过的模块
  var __webpack_module_cache__ = {}

  // 当加载一个模块时，都会通过这个函数来加载
  // moduleId 就是需要加载的模块路径
  function __webpack_require__(moduleId) {
    // 1、判断是否已经加载过这个模块
    if (__webpack_module_cache__[moduleId]) {
      return __webpack_module_cache__[moduleId].exports
    }
    
    // 2、给 module 变量和 __webpack_module_cache__[moduleId] 赋值了同一个对象
    // 这样做的好处：两者同时指向同一个对象，那么，当这个被指向的对象改变，那么这两者的也会同时改变
    var module = __webpack_module_cache__[moduleId] = { exports: {} }

    // 3、执行 __webpack_modules__ 相应模块的函数，参数是 module、module.exports、__webpack_require__
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__)

    // 4、导出 module.exports 这个对象
    return module.exports
  }

  // 为 __webpack_require__ 这个函数对象添加一个属性 d --> function
  !(function () {
    // exports：就是 module 中的 exports；definition：模块中的导出
    __webpack_require__.d = function (exports, definition) {
      for (var key in definition) {
        // 如果一个 key 在 definition 中，而不在 exports 中
        if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
          // 为 module 的 exports 代理到 definition，访问 module.exports 的 key 会被代理到 definition
          // 也就是说 exports 本身并没有 { sum: Function, mul: Function }，访问 sum 的时候实际上读取的是 definition 的
          Object.defineProperty(exports, key, { enumerable: true, get: definition[key] })
        }
      }
    }
  })()

  // 为 __webpack_require__ 这个函数对象添加一个属性 o --> function
  !(function () {
    // 这个 o 函数的作用：判断某个对象是否包含某个 key
    __webpack_require__.o = function (obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop)
    }
  })()

  // 为 __webpack_require__ 这个函数对象加一个属性 r --> function
  !(function () {
    __webpack_require__.r = function (exports) {
      if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })
      }
      // 为 module 的 exports 对象设置一个 __esModule，值为 true
      // 目的就是标记当前这个模块是不是 es module，以便后面如果需要，能够用到这个信息
      Object.defineProperty(exports, '__esModule', { value: true })
    }
  })()

  var __webpack_exports__ = {}

  // 自执行函数实现代码逻辑
  !(function () {
    __webpack_require__.r(__webpack_exports__)
    var _js_math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__('./src/js/math.js')

    console.log((0, _js_math__WEBPACK_IMPORTED_MODULE_0__.mul)(20, 30))
    console.log((0, _js_math__WEBPACK_IMPORTED_MODULE_0__.sum)(20, 30))
  })()
})()
