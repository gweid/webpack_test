// 最外层就是一个自执行函数
(function () {
  // 定义了一个对象去存储模块
  // 模块的路径是对象的 key，模块的代码封装在一个函数里作为是对象的 value
  var __webpack_modules__ = {
    './src/js/format.js': function (module) {
      const dateFormat = (date) => {
        return '2020-12-12';
      };

      const priceFormat = (price) => {
        return '100.00';
      };

      module.exports = {
        dateFormat,
        priceFormat,
      };
    },
  };

  // 这个对象, 作为加载模块的缓存
  var __webpack_module_cache__ = {};

  // 当加载一个模块时，都会通过这个函数来加载
  // moduleId 就是需要加载的模块路径
  function __webpack_require__(moduleId) {
    // 1、判断缓存是否加载过
    if (__webpack_module_cache__[moduleId]) {
      return __webpack_module_cache__[moduleId].exports;
    }

    // 2、给 module 变量和 __webpack_module_cache__[moduleId] 赋值了同一个对象
    // 这样做的好处：两者同时指向同一个对象，那么，当这个被指向的对象改变，那么这两者的也会同时改变
    var module = __webpack_module_cache__[moduleId] = { exports: {} };

    // 3、加载模块
    // 将 module={ exports: {} } 这个对象传给 __webpack_modules__[moduleId] 这个函数，让这个函数往 module 添加东西
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

    // 4、导出 module.export { dateFormat: function, priceForamt: function }
    return module.exports;
  }

  // 通过自执行函数实现代码逻辑
  !(function () {
    // 将 require 加载转换为实现的 __webpack_require__ 加载，通过 __webpack_require__ 去加载模块
    const { dateFormat, priceFormat } = __webpack_require__('./src/js/format.js');

    console.log(dateFormat('abc'));
    console.log(priceFormat('abc'));
  })();
})();
