import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TopicItemType } from "../types";

export interface UserState {
  sources: string[]; // user followed sources
  categories: string[]; // user followed topics
  liked: (TopicItemType | string)[]; // user liked content
  authors: string[]; // user followed authors
  board: (TopicItemType | string)[]; // user saved content
  reads: number;
}

const initialState: UserState = {
  sources: [],
  categories: [],
  liked: [],
  authors: [],
  board: [],
  reads: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    incrementReads: (state) => {
      state.reads += 1;
    },
    updateSources: (state, action: PayloadAction<string[]>) => {
      state.sources = action.payload;
    },
    addSource: (state, action: PayloadAction<string>) => {
      state.sources.push(action.payload);
    },
    removeSource: (state, action: PayloadAction<string>) => {
      state.sources = state.sources.filter(
        (source) => source !== action.payload
      );
    },
    updateAuthors: (state, action: PayloadAction<string[]>) => {
      state.authors = action.payload;
    },
    addAuthor: (state, action: PayloadAction<string>) => {
      state.authors.push(action.payload);
    },
    removeAuthor: (state, action: PayloadAction<string>) => {
      state.authors = state.authors.filter(
        (author) => author !== action.payload
      );
    },

    addToLiked: (state, action: PayloadAction<TopicItemType | string>) => {
      state.liked.push(action.payload);
    },
    removeFromLiked: (state, action: PayloadAction<string>) => {
      if (typeof action.payload === "string") {
        state.liked = state.liked.filter((item) => item !== action.payload);
        return;
      }

      state.liked = state.liked.filter((item) => {
        if (typeof item === "string") {
          return true;
        }
        return item.id !== action.payload;
      });
    },

    addToBoard: (state, action: PayloadAction<TopicItemType | string>) => {
      state.board.push(action.payload);
    },
    removeFromBoard: (state, action: PayloadAction<string>) => {
      if (typeof action.payload === "string") {
        state.board = state.board.filter((item) => item !== action.payload);
        return;
      }
      state.board = state.board.filter((item) => {
        if (typeof item === "string") {
          return true;
        }
        return item.id !== action.payload;
      });
    },
  },
});

export const {
  updateSources,
  updateAuthors,
  addSource,
  addAuthor,
  removeSource,
  removeAuthor,
  addToBoard,
  removeFromBoard,
  addToLiked,
  removeFromLiked,
  incrementReads,
} = userSlice.actions;
export default userSlice.reducer;
