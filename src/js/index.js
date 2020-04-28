import '@css/index.css'
import '@css/index.scss'

import hello from './hello'
import $ from "jquery"
import zepto from "zepto-webpack"

console.log('index.js加载')

console.log($)
console.log(zepto);


hello()

function test() {
  return 'test huancun'
}
console.log(console.log(test()))

const add = (x, y) => {
  return x + y
}
console.log(add(1, 51))

const arr = [1, 2, 3]
console.log(arr.includes(1))

class Person {
  constructor(name) {
    this.name = name
  }
  getName() {
    console.log(this.name)
  }
}
const person = new Person('jacklusy')
person.getName()

const btn = document.querySelector('#btn')
btn.addEventListener('click', (e) => {
  // 懒加载
  // import('./sub').then(({ addSub }) => {
  //   console.log(addSub(1, 7))
  // })

  // 懒加载代码分割
  // import(/* webpackChunkName: 'sub' */'./sub').then(({ addSub }) => {
  //   console.log(addSub(1, 7))
  // })

  // 预加载  webpackPrefetch: true
  import( /* webpackChunkName: 'sub', webpackPrefetch: true */ './sub').then(
    ({
      addSub
    }) => {
      console.log(addSub(1, 9))
    }
  )
})

// 注册 serviceworker 并且处理兼容问题
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(() => {
        console.log('serviceWorker 注册成功')
      })
      .catch((err) => {
        console.log('serviceWorker 注册失败')
      })
  })
}