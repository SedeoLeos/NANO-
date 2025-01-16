import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth";
import { taskSlice } from "./slices/task";


const store= configureStore({
    reducer:{
        'auth':authSlice.reducer,
        'task':taskSlice.reducer        
    },
    middleware:getDefaultMiddleware=>{
        return getDefaultMiddleware({
            serializableCheck:false
        })
    },
    devTools:true,
})

export default store;



