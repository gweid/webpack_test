const express = require('express');

const app = express();

const resList = [
  {
    id: '001',
    name: 'jack',
    age: 18
  },
  {
    id: '002',
    name: 'mark',
    age: 20
  }
]

app.get('/api/list', (req, res) => {
  return res.json(resList);
})

app.listen('8888', () => {
  console.log('开启服务: http://localhost:8888');
})