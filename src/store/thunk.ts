import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTopics = createAsyncThunk(
    "topics/fetchTopics", 
    async (url, thunkAPI) => {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                return thunkAPI.rejectWithValue({ error: response.statusText });
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error?.message || "Failed to fetch topics"
            });
        }
    }
)