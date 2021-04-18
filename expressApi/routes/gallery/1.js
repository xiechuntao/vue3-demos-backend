/*!
 * for vue-gallery 1-hellow-ct
 * Autor xct
 * 2021-4-18 PM
 * 1 Retrieve todolist
 * http://localhost:1001/gallery1/getTodoList
 * 2 Create a item
 * http://localhost:1001/gallery1/addTodoList 
 * 3 Delete a item
 * http://localhost:1001/gallery1/getTodoList
 * 4 Update a item
 * http://localhost:1001/gallery1/updateTodoList
 */
// 获取url参数 依赖于url模块 使用前需要使用
// var URL = require('url');
var express = require('express');
var router = express.Router();
const connectPool = require("../../connectPool")
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

connectPool.connect();
var sql = 'SELECT * FROM 1_todolist';
let str = null;

// 展现todolist
router.get('/getTodoList', function (req, res, next) {
  connectPool.query(sql, function (err, result) {
    if (err) {
      throw err;
    } else {
      // console.log(result)
      var response = { status: 1, data: result };
      res.send(response)
    }
    // console.log(result);  //数据库查询结果返回到result中
  });

});

// 增加一条数据 
router.post('/addTodoList', function(req, res){
  var param = req.body;
  console.log(param);
  connectPool.query('INSERT INTO 1_todolist(date, time, eat) values(?,?,?)', [param.date,param.time,param.eat], function(err, result) {
      if (err){
          throw '添加失败：' + err;
      }else{
          var data = {code:'200',code_decoration:'添加成功'};
          res.send(data);
      }
  });
});

// 删除一条数据 
router.post('/delTodoList', function (req, res) {
  var id = req.body.id || req.params.id;
  const SQL = `DELETE FROM 1_todolist WHERE id=${id}`
  connectPool.query(SQL, function (err, rows) {
      if (err) {
        throw '删除失败：' + err;
      } else {
          var data = {code:'200',code_decoration:'删除成功'};
          res.send(data);
      }
  });
});


// 修改一条数据
router.post('/updateTodoList', function (req, res) {
  var param = req.body || req.params;
  console.log(param);
  const SQL = "UPDATE 1_todolist SET date='" + param.date + "',time='" + param.time + "',eat='" + param.eat + "'where id=" + param.id;
  console.log(SQL)
  connectPool.query(SQL, function (err, rows) {
      if (err) {
          res.send('更新失败：' + err);
      } else {
          var data = {code:'200',code_decoration:'更新成功'};
          res.send(data);
      }
  });
});

module.exports = router;
