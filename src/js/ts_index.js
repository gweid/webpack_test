"use strict";
var message = 'jack';
var printFun = function (str) {
    console.log(str);
};
var resPromise = new Promise(function (resolve, reject) { });
printFun(message);
