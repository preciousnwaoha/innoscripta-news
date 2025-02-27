import { configureStore } from "@reduxjs/toolkit";
import topicsReducer from "./topics/topicsSlice";      
import themeReducer from "./themeSlice";
import userReducer from "./userSlice";
import { topicsApi } from "./topics/topicsApiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";


const store = configureStore({
    reducer: { 
        topics: topicsReducer,
        theme: themeReducer,
        user: userReducer,
        // API Slices
        [topicsApi.reducerPath]: topicsApi.reducer
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({    
        // serializableCheck: false,
    }).concat(topicsApi.middleware)

    
})


setupListeners(store.dispatch)


export default store;