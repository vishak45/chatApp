const Chat = require("../models/chatModel");

const Chat = require("../models/chat"); // Import Chat model

const accessChat = async (req, res) => {
  try {
    const { sid,cid } = req.body;     // sid = second user ID
    const uid = req.user.id;     // uid = your ID from authentication
    if (!sid) {
      return res.status(400).json({ message: "Second user ID (sid) is required" });
    }

   let chat = await Chat.findOne({
  isGroupChat: false,
  _id: cid,
  users: { $all: [uid, sid], $size: 2 }
})


    if (!chat) {
      chat = await Chat.create({
        chatName: "sender",
        isGroupChat: false,
        users: [uid, sid]
      });

      // Optionally populate users after creation
      chat = await chat.populate("users", "-password").execPopulate();
    }

    res.status(200).json(chat);
  } catch (error) {
    console.error("Access Chat Error:", error);
    res.status(500).json({ message: error.message });
  }
};

const accessGroupChat = async (req, res) => {
    try{
        const {uid}=req.user.id
        const {gid}=req.body
        const fetchMsg=await Chat.findOne({
  isGroupChat: true,
  _id: gid,
  users: { $in: [uid] }
})

        if(!fetchMsg){
            return res.status(400).json({message:"Chat not found"})
        }
            res.status(200).json(fetchMsg)
    }catch(error){
        console.log(error)
        res.status(500).json({message:error.message})
    }
    }

module.exports = { accessChat, accessGroupChat };