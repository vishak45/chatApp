import {createSlice,createAsyncThunk,configureStore} from '@reduxjs/toolkit'
import axiosInstance from './axiosInstance'

const initialState={
    token:localStorage.getItem('token')||null,
    user:localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null,
    loading:false,
    error:null,
    status:null
}


export const loginUserFn=createAsyncThunk('userAuth/loginUSer',async({email,password})=>{
    try{
        const response=await axiosInstance.post('/api/login',{email,password})
        return {token:response.data.token,user:response.data.user,status:response.data.status}
    }catch(error){
        console.error(error)
        throw error
    }
})

export const regiserUser=createAsyncThunk('userAuth/regiserUser',async({name,email,password})=>{
    try{
        const response=await axiosInstance.post('/api/register',{name,email,password})
        return response.data
    }catch(error){
        console.error(error)
        throw error
    }
})

const slice=createSlice({
    name:"userAuth",
    initialState,
    reducers:{
        logoutFn:(state)=>{
            state.token=null,
            state.user=null,
            state.loading=false,
            state.error=null,
            localStorage.removeItem('token'),
            localStorage.removeItem('user')
        }
    },
    extraReducers(builder){
        builder
        .addCase(loginUserFn.fulfilled,(state,action)=>{
            state.token=action.payload.token
            state.user=action.payload.user
            state.loading=false
            state.error=null
            state.status=action.payload.status
            localStorage.setItem('token',action.payload.token)
            localStorage.setItem('user',JSON.stringify(action.payload.user))
        })
        .addCase(loginUserFn.pending,(state)=>{
            state.loading=true
            state.error=null
            state.status=null
        })
        .addCase(loginUserFn.rejected,(state)=>{
            state.loading=false
            state.error=true
            state.status=null
        })

        .addCase(regiserUser.fulfilled,(state,action)=>{
            state.token=action.payload.token
            state.user=action.payload.user
            state.loading=false
            state.error=null
            state.status=action.payload.status
        })
        .addCase(regiserUser.pending,(state)=>{
            state.loading=true
            state.error=null
            state.status=null
        })
        .addCase(regiserUser.rejected,(state)=>{
            state.loading=false
            state.error=true
            state.status=null
        })
    }
})

export const {logoutFn}=slice.actions
export default configureStore({reducer:slice.reducer})