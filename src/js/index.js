// 要想不要被 tree shaking 干掉这样引用的 css，需要在 package.json 中配置 "sideEffects": ["*.css", "*.scss"]
import '../css/index.css';
import '../css/index.scss';

// 直接这样通过 es6 的 import引用，在生产环境会被 tree shaking 干掉，可以使用
import './jsx_index.jsx'; 
import './ts_index.ts';
import './hmr_test';

import $ from 'jquery';
import zepto from 'zepto-webpack';
import axios from 'axios';

import hello from './hello';
import { myJoin, getCurrentDay } from './split';

myJoin('hello');
getCurrentDay()

if (module.hot) {
  module.hot.accept('./hmr_test.js', () => {});
}

console.log('index.js加载');

console.log($);
console.log(zepto);

hello();

function test() {
  return 'test huancun';
}
console.log(console.log(test()));

const add = (x, y) => x + y;

console.log(add(1, 51));

const arr = [1, 2, 3];
console.log(arr.includes(1));

class Person {
  constructor(name) {
    this.name = name;
  }

  getName() {
    console.log(this.name);
  }
}

const person = new Person('jacklusy');
person.getName();

const btn = document.querySelector('#btn');

btn.addEventListener('click', () => {
  // 懒加载
  // import('./sub').then(({ addSub }) => {
  //   console.log(addSub(1, 7))
  // })

  // 懒加载代码分割 /* webpackChunkName: 'sub' */ 通过魔法注释配合 output.chunkFilename 进行打包出去的文件进行命名
  // import(/* webpackChunkName: 'sub' */ './sub').then(({ addSub }) => {
  //   console.log('懒加载', addSub(1, 7))
  // })

  // 预加载  webpackPrefetch: true
  import(/* webpackChunkName: 'sub', webpackPrefetch: true */ './sub').then(({ addSub }) => {
      console.log('预加载', addSub(1, 9));
    },
  );
});

// 注册 serviceworker 并且处理兼容问题
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(() => {
        console.log('serviceWorker 注册成功');
      })
      .catch((err) => {
        console.log(`serviceWorker 注册失败 ${err}`);
      });
  });
}

// axios
//   .get('/api/list')
//   .then(res => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.log(err);
//   })
