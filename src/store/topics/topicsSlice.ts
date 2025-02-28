import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  topics: [],
  status: "idle",
  error: null,
  searchResults: [],
  searchStates: {
    query: "",
    active: false,
    isLoading: false,
    error: false,
  },
  searchFilters: {
    categories: [],
    dateTo: "",
    dateFrom: "",
    sortBy: "",
    sources: [],
    page: 1,
    pageSize: 10,
  }
};

const topicsSlice = createSlice({
  name: "topics",
  initialState,
  reducers: {
    updateTopics(state, action) {
      state.topics = action.payload;
    },
    updateSearchResults(state, action) {
      state.searchResults = action.payload;
    },
    updateSeachStates(state, action) {
      state.searchStates = action.payload;
    },
    updateSearchQuery(state, action) {
      state.searchStates = {
        ...state.searchStates,
        query: action.payload,
      }
    }
  },
  
});

export const {
  updateTopics,
  updateSearchResults,
  updateSeachStates,
} = topicsSlice.actions;

export default topicsSlice.reducer;
