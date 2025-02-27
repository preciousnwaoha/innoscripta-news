import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  topics: [],
  status: "idle",
  error: null,
};

const topicsSlice = createSlice({
  name: "topics",
  initialState,
  reducers: {
    setTopics(state, action) {
      state.topics = action.payload;
    },
  },
  
});

export const topicsActions = topicsSlice.actions;

export default topicsSlice.reducer;
