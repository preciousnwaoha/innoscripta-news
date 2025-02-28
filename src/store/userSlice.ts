import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  sources: string[];
  categories: string[];
  authors: string[];
  board: {
    source: string;
    category: string;
    id: string;
  }[],
}

const initialState: UserState = {
  sources: [],
  categories: [],
  authors: [],
  board: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateSources: (state, action: PayloadAction<string[]>) => {
      state.sources = action.payload;
    },
    updateCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
    updateAuthors: (state, action: PayloadAction<string[]>) => {
      state.authors = action.payload;
    },
  },
});

export const { updateSources, updateCategories, updateAuthors } =
  userSlice.actions;
export default userSlice.reducer;
