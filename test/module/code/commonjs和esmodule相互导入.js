// 外面一个自执行函数
;(function () {
  // 定义一个对象，用于存储模块
  // 模块路径作为对象 key 值
  var __webpack_modules__ = {
    './src/js/format.js': function (module) {
      const dateFormat = (date) => {
        return '2020-12-12'
      }

      const priceFormat = (price) => {
        return '100.00'
      }

      module.exports = {
        dateFormat,
        priceFormat
      }
    },
    './src/js/math.js': function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      'use strict'
      // 调用 __webpack_require__.r，记录 __esModule 为 true
      __webpack_require__.r(__webpack_exports__)

      // // 调用 __webpack_require__.d，将 __webpack_exports__ 没有的代理到 { sum: Function, mul: Function }
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

  // 这个对象用于存储加载过的模块
  var __webpack_module_cache__ = {}

  // 当加载一个模块时，都会通过这个函数来加载
  // moduleId 就是需要加载的模块路径
  function __webpack_require__(moduleId) {
    // 1、判断是否加载过这个模块
    if (__webpack_module_cache__[moduleId]) {
      return __webpack_module_cache__[moduleId].exports
    }

    // 2、给 module 变量和 __webpack_module_cache__[moduleId] 赋值了同一个对象
    // 这样做的好处：两者同时指向同一个对象，那么，当这个被指向的对象改变，那么这两者的也会同时改变
    var module = __webpack_module_cache__[moduleId] = { exports: {} }

    // 3、执行 __webpack_modules__ 相应模块的函数
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__)

    // 4、导出 module.exports 这个对象
    return module.exports
  }

  !(function () {
    __webpack_require__.n = function (module) {
      var getter =
        module && module.__esModule
          ? function () {
              return module['default']
            }
          : function () {
              return module
            }
      __webpack_require__.d(getter, { a: getter })
      return getter
    }
  })()

  // 给 __webpack_require__ 函数对象加一个 d --> function
  !(function () {
    __webpack_require__.d = function (exports, definition) {
      for (var key in definition) {
        // 如果一个 key 在 definition 中，而不在 exports 中
        if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
          // 为 module 的 exports 代理到 definition，访问 module.exports 的 key 会被代理到 definition，访问
          Object.defineProperty(exports, key, { enumerable: true, get: definition[key] })
        }
      }
    }
  })()

  // 给 __webpack_require__ 函数对象加一个 o --> function
  !(function () {
    // 这个函数的作用是判断对象是否包含某个 key
    __webpack_require__.o = function (obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop)
    }
  })()

  // // 给 __webpack_require__ 函数对象加一个 r --> function
  !(function () {
    __webpack_require__.r = function (exports) {
      if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })
      }
      // 给 exports 设置 __esModule，值为 true
      Object.defineProperty(exports, '__esModule', { value: true })
    }
  })()

  var __webpack_exports__ = {}

  // 自执行函数实现代码逻辑
  !(function () {
    'use strict'
    __webpack_require__.r(__webpack_exports__)
    var _js_format__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__('./src/js/format.js')
    var _js_format__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_js_format__WEBPACK_IMPORTED_MODULE_0__)

    const { sum, mul } = __webpack_require__('./src/js/math.js')

    console.log(sum(20, 30))
    console.log(mul(20, 30))

    console.log((0, _js_format__WEBPACK_IMPORTED_MODULE_0__.dateFormat)('aaa'))
    console.log((0, _js_format__WEBPACK_IMPORTED_MODULE_0__.priceFormat)('bbb'))

    console.log(abc)
  })()
})()
