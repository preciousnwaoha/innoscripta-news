import { configureStore } from "@reduxjs/toolkit";
import topicsReducer from "./topics/topicsSlice";
import generalReducer from "./generalSlice";
import userReducer from "./userSlice";
import { topicsApi } from "./topics/topicsApiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    topics: topicsReducer,
    general: generalReducer,
    user: userReducer,
    // API Slices
    [topicsApi.reducerPath]: topicsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(topicsApi.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
