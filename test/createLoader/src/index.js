import "highlight.js/styles/default.css"
import './css/codeHighlight.css'

import code from './doc/webpack.md'

const printStr = 'hello webpack';

console.log(printStr);

const getFullName = (first, last) => {
  return first + last;
};

const myName = getFullName('张', '三');

console.log(myName);

document.body.innerHTML = code