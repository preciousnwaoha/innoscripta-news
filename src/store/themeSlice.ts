import { createSlice } from "@reduxjs/toolkit";

const initialState = "light";

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme(state) {
            state = state === "light" ? "dark" : "light";
            return state;
        }
    }
});

export const themeActions = themeSlice.actions;

export default themeSlice.reducer;

