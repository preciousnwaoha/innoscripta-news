import { configureStore, combineReducers } from "@reduxjs/toolkit";
import topicsReducer from "./topics/topicsSlice";
import generalReducer from "./generalSlice";
import userReducer from "./userSlice";
import { topicsApi } from "./topics/topicsApiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Persist config for the user slice only
const userPersistConfig = {
  key: "user",
  storage,
};

const rootReducer = combineReducers({
  topics: topicsReducer,
  general: generalReducer,
  // Only the user slice is persisted
  user: persistReducer(userPersistConfig, userReducer),
  [topicsApi.reducerPath]: topicsApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Ignore redux-persist actions for serializability checks
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/FLUSH",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }).concat(topicsApi.middleware),
});

setupListeners(store.dispatch);

// Create persistor for rehydrating the user slice from localStorage
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
