const express=require('express')
const router=express.Router()
const protect=require('../middleware/authMiddleWare')
const {loginUser,registerUser,updatePic}=require('../controllers/userController')
router.post('/login',loginUser)
router.post('/register',registerUser)
router.put('/profile-pic',protect,updatePic)
module.exports=router