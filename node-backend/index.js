const http = require('http')

const server = http.createServer()

const io = require('socket.io')(server, {
  cors: { origin:'*'}
})

io.on('connection', (socket) => {
  console.log('se ha conectado un cliente')
  console.log(socket)
  socket.on('mensaje_normal', (data) => {
    io.emit('mensaje_normal', data)
  })
})

server.listen(3000, () => {
  console.log('servidor escuchando en el puerto http://localhost:3000')
})