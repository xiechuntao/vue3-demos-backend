// 获取url参数 依赖于url模块 使用前需要使用
// var URL = require('url');
// -------------------
var express = require('express');
var router = express.Router();
const connectPool = require("../../connectPool")
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// // 连接数据库
// var mysql = require('mysql');
// //创建mysql实例
// var connection = mysql.createConnection({
//   host: '127.0.0.1',
//   port: '3306',
//   user: 'root',
//   password: 'root',
//   database: 'test'
// });
connectPool.connect();
var sql = 'SELECT * FROM todolist';
let str = null;
connectPool.query(sql, function (err, result) {
  if (err) {
    console.log('[SELECT ERROR]:', err.message);
  }
  // console.log(result);  //数据库查询结果返回到result中
  str = result;
});

router.get('/getTodoList', function (req, res, next) {
  console.log(str);  //数据库查询结果返回到result中
  let todoList = str;
  var response = { status: 1, data: todoList };
  res.send(response)
});
module.exports = router;
