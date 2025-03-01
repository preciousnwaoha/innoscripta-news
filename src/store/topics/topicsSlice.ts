import { createSlice } from "@reduxjs/toolkit";
import { TopicItemType } from "../../types";

interface TopicsStateType {
  topics: TopicItemType[];
  status: string;
  error: string | null;
  searchResults: TopicItemType[];
  searchStates: {
    query: string;
    active: boolean;
    isLoading: boolean;
    error: boolean;
  };
  searchFilters: {
    categories: string[];
    dateTo: string;
    dateFrom: string;
    sortBy: string;
    sources: string[];
    page: number;
    pageSize: number;
  };
}


const initialState: TopicsStateType = {
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
    pageSize: 40,
  }
};

const topicsSlice = createSlice({
  name: "topics",
  initialState,
  reducers: {
    resetSearchFilters(state) {
      state.searchFilters = {
        categories: [],
        dateTo: "",
        dateFrom: "",
        sortBy: "",
        sources: [],
        page: 1,
        pageSize: 40,
      }
    },
    updateTopics(state, action) {
      state.topics = action.payload;
    },
    updateSearchResults(state, action) {
      state.searchResults = action.payload;
    },
    updateSearchStates(state, action) {
      state.searchStates = action.payload;
    },
    updateSearchFilters(state, action) {
      state.searchFilters = action.payload
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
  updateSearchFilters,
  updateSearchStates,
  resetSearchFilters,
  updateSearchQuery
} = topicsSlice.actions;

export default topicsSlice.reducer;
