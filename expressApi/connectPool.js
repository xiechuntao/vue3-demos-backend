// 连接池
// 连接数据库
var mysql = require('mysql');
//创建mysql实例
var connectPool = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'test'
});
module.exports = connectPool;