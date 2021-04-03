import _ from 'lodash';
import day from 'dayjs'

export function myJoin(str) {
  console.log(_.join('lodash========='), str); 
}

export function getCurrentDay() {
  console.log('dayjs========', day());
}
