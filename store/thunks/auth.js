import { api } from "@/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const LoginThunk=createAsyncThunk('user_login', async(info,{rejectWithValue,fulfillWithValue})=>{
    try {
        const {data}= await api.post(`/auth/login`,info,{withCredentials:true});

        localStorage.setItem('userToken',data.token);

        return fulfillWithValue(data);
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

