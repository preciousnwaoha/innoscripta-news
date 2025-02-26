import { configureStore } from "@reduxjs/toolkit";
import topicsReducer from "./topicsSlice";      
import themeReducer from "./themeSlice";
import userReducer from "./userSlice";


const store = configureStore({
    reducer: { 
        topics: topicsReducer,
        theme: themeReducer,
        user: userReducer
    }
})

export default store;