import { createSlice } from "@reduxjs/toolkit";
import { LoginThunk } from "../thunks/auth";
import { decodeToken } from "@/utils";

export const authSlice= createSlice({
    name:'auth',
    initialState:{
       loader:false,
       errorMessage:'',
       successMessage:'',
       userInfos: null,
    },
    reducers:{       
        restartMessageValue: (state,{payload})=>{
            state.errorMessage='';
            state.successMessage='';
        },
        restartUserInfos: (state, { payload }) => {
            state.userInfos = payload || null;
        }
    },
    extraReducers:(builder)=>{
        
        // LoginThunk

        builder.addCase(LoginThunk.rejected,(state,{payload})=>{
            state.loader=false;
            state.errorMessage=payload.message;
        })
        builder.addCase(LoginThunk.pending,(state,{payload})=>{
            state.loader=true;
        })
        builder.addCase(LoginThunk.fulfilled,(state,{payload})=>{
            state.loader=false;
            state.successMessage=payload.message;
            state.userInfos= decodeToken(payload.token);
        })

    }
    
})

export const {restartMessageValue,restartUserInfos}= authSlice.actions
