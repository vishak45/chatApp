const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const {Server}=require('socket.io')
const http=require('http')
const app=express()
const port=5000
const loginUser=require('./routes/userRoutes')
app.use(cors())
app.use(bodyParser.json())
const server=http.createServer(app)

const io=new Server(server,{
  cors:{
    origin:"*",
    methods:["GET","POST"]
  }
})

app.use('/api/user',loginUser)
io.on("connection",(socket)=>{
  console.log("new user: "+socket.id)
  socket.emit("my-id",socket.id)
  socket.on("message",(data)=>{
   
    const {msg,uid,room,image}=data
    socket.to(room).emit("message",{msg:msg,uid:uid,image:image})
  })
  socket.on("join-room",(data)=>{
    const {uid,room}=data
    console.log(uid,room)
    socket.join(room)
    socket.to(room).emit("user-connected")

  })
  socket.on("typing",(data)=>{
    const {uid,room}=data
    console.log(uid,room)
    socket.to(room).emit("typing",uid)
  })
})

server.listen(port,()=>{
  console.log("hello: "+port)
})