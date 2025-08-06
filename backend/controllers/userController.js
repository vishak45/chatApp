const userSchema = require("../models/userModel");
const passwordHash = require("password-hash"); 
const jwt=require("jsonwebtoken") 
const cloudinary = require("../config/cloudinary");

const registerUser = async (req, res) => {
    try {
        const { name, email, password, pic } = req.body;
        let emailExists=await userSchema.findOne({email})
        if(emailExists){
            return res.status(400).json({ message: "Email already exists" });
        }
        const hashedPassword = passwordHash.generate(password);
         let profilePic = "";
        if (pic) {
            const myCloud = await cloudinary.uploader.upload(pic, {
                folder: "profile-pic",
            });
            profilePic = myCloud.secure_url;
        }
        const user = await userSchema.create({
            name,
            email,
            password: hashedPassword,
            pic: profilePic,
        });
        res.status(201).json({message:"User registered successfully"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser=async(req,res)=>{
    try {
        const {email,password}=req.body
        let user=await userSchema.findOne({email})
        if(!user){
            return res.status(400).json({ message: "User not found" });
        }
        if(!passwordHash.verify(password,user.password)){
            return res.status(400).json({ message: "Invalid password" });
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"})
        let userName=user.name
        res.status(200).json({message:"Login successful",token,userName})

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updatePic=async(req,res)=>{
    try {
        const user=req.user
        const {pic}=req.body
        const usercheck=await userSchema.findById(user)
        if(!usercheck){
            return res.status(400).json({ message: "User not found" });
        }
        if(usercheck.pic){
            await cloudinary.uploader.destroy(user.pic.split("/")[3].split(".")[0])
        }
        const myCloud = await cloudinary.uploader.upload(pic, {
            folder: "profile-pic",
        });
        usercheck.pic=myCloud.secure_url
        await usercheck.save()
        res.status(200).json({message:"Profile pic updated successfully"})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { registerUser,loginUser,updatePic };