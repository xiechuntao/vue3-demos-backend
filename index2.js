let express = require('express') // 引入express中间件
let app = express()
let http = require('http').Server(app) // 引入socket.io
let io = require('socket.io')(http)


app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.get('/', (req, res) => res.send('Hello 嘎嘎。ßß')) // 初始化进入

// app.use('/user', require('./router/user')) // 引入user路由


// 开启socket
io.on('connect', socket => {
  socket.emit('open', '初始化连接') // 指定open标识t
  setTimeout(() => {
    socket.emit('open', '嘿嘿') // 指定open标识
  }, 2000)

  // 当客户端关闭时，向所有正在连接的客户端广播
  socket.on('disconnect', () => {
    socket.broadcast.emit('关闭')
  })
})

let server = http.listen(3000, '127.0.0.1', () => {
  let host = server.address().address
  let port = server.address().port

  console.log(`Server running at http://${host}:${port}`)
})