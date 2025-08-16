const express=require('express')
const router=express.Router()
const {protect}=require('../middleware/authMiddleWare')
const {accessChat,fetchChat}=require('../controllers/chatController')
router.post('/chat',protect,accessChat)
router.get('/chat/all',protect,fetchChat)
module.exports=router