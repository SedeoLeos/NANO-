import { createSlice } from "@reduxjs/toolkit";
import { AddTaskThunk, GetTaskThunk } from "../thunks/task";

export const taskSlice= createSlice({
    name:'task',
    initialState:{
       loader:false,
       errorMessage:'',
       successMessage:'',
       task: null,
       tasks:[],
    },
    reducers:{       
        restartMessageValue: (state,{payload})=>{
            state.errorMessage='';
            state.successMessage='';
        },
    },
    extraReducers:(builder)=>{
        
        // AddTaskThunk

        builder.addCase(AddTaskThunk.rejected,(state,{payload})=>{
            state.loader=false;
            state.errorMessage=payload.message;
        })
        builder.addCase(AddTaskThunk.pending,(state,{payload})=>{
            state.loader=true;
        })
        builder.addCase(AddTaskThunk.fulfilled,(state,{payload})=>{
            state.loader=false;
            state.successMessage=payload.message;
            state.tasks=[...state.tasks,payload.task];
        })

         // GetThunk

        builder.addCase(GetTaskThunk.fulfilled,(state,{payload})=>{
            state.loader=false;
            state.tasks=payload.tasks;
        })
        

        

    }
    
})

export const {restartMessageValue}= taskSlice.actions