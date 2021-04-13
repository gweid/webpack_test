import './doc/webpack.md'

const printStr = 'hello webpack';

console.log(printStr);

const getFullName = (first, last) => {
  return first + last;
};

const myName = getFullName('张', '三');

console.log(myName);