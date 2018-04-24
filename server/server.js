const express = require('express');
const userRouter = require('./user')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server)


const model = require('./model')
const Chat = model.getModel('chat')

io.on('connection', function(socket) {
    console.log('socket 连接成功')
    socket.on('send', function(data) {
        const {form, to, msg} = data
        const chat_id = [form, to].sort().join('_')
        Chat.create({chat_id, form, to, content: msg}, function(err, doc) {
            io.emit('receive', Object.assign({},doc._doc))
        })
    })

})

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)

server.listen(8088, function() {
    console.log('start server success')
})