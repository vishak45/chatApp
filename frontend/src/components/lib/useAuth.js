import { create } from "zustand";
import axios from 'axios'
const useAuth=create((set,get)=>({
   token:null,
   success:null,
   loginUser:async(email,password)=>{
        try{
            set({success:null})
            const res=await axios.post('http://localhost:3005/api/login',{
                email,password
            });
            if(res.data.token){
                set({token:res.data.token})
                set({success:true})
            }
        }
        catch(error){
            console.log(error)
            set({success:false})
            console.log(get().success)
            
        }
   },
   setMsg:()=>{set({success:null})}

}))

export default useAuth