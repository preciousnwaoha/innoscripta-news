import { createSlice } from "@reduxjs/toolkit";


interface GeneralState {
    theme: string;
    breadcrumb: { label: string, href?: string }[];
}

const initialState: GeneralState = {
    theme: "dark",
    breadcrumb: [ ]
};

const generalSlice = createSlice({
    name: "general",
    initialState,
    reducers: {
        toggleTheme(state) {
            state.theme = state.theme === "light" ? "dark" : "light";
        },
        updateBreadcrumb(state, action) {
            state.breadcrumb = action.payload;
        },
        addBreadcrumb(state, action) {
            state.breadcrumb.push(action.payload);
        }

    }
});

export const {
    toggleTheme,
    updateBreadcrumb
} = generalSlice.actions;

export default generalSlice.reducer;

