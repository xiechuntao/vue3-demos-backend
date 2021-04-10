// 连接池
// 连接数据库
var mysql = require('mysql');
//创建mysql实例
var connectPool = mysql.createConnection({
    // host: '127.0.0.1',
    host: '212.64.32.35',
    port: '3306',
    user: 'root',
    password: 'xiechuntao',
    // password: 'root',
    database: 'vue-gallery'
});
module.exports = connectPool;