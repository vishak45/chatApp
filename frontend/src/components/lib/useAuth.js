import { create } from "zustand";
import axiosInstance from "./axiosInstance";
const useAuth=create((set,get)=>({
   token:localStorage.getItem('token')||null,
   success:null,
   loginUser:async(email,password)=>{
        try{
            set({success:null})
            const res=await axiosInstance.post('/login',{
                email,password
            });
            if(res.data.token){
                localStorage.setItem('token',res.data.token)
                set({token:res.data.token})
                set({success:true})
            }
        }
        catch(error){
            console.log(error)
            set({success:error.response.data.message})
            console.log(get().success)
            
        }
   },
   registerUer:async(name,email,password,pic)=>{
       try{
           set({success:null})
           const res=await axiosInstance.post('/register',{
               name,email,password,pic
           });
           if(res.data){
               set({success:true})
           }
       }
       catch(error){
           console.log(error)
           set({success:error.response.data.message})
           console.log(get().success)
       }
   },
   setMsg:()=>{set({success:null})}

}))

export default useAuth