import { api } from "@/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const AddTaskThunk=createAsyncThunk('add_task', async(info,{rejectWithValue,fulfillWithValue})=>{
    try {
        const {data}= await api.post(`/task/add`,info,{withCredentials:true});

        return fulfillWithValue(data);
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

