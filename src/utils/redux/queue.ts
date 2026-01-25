import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchQueue = createAsyncThunk(
    'spotifyQueue/fetchQueue',
    async (_, { rejectWithValue }) => {
        try {
            // Call the API route
            const response = await fetch('/api/player/queue');
            if (!response.ok) {
                throw new Error('Failed to fetch Spotify queue');
            }
            const data = await response.json();
            return data.queue; // Assuming the API route returns a `queue` array
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const spotifyQueueSlice = createSlice({
    name: 'spotifyQueue',
    initialState: {
        queue: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchQueue.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchQueue.fulfilled, (state, action) => {
                state.loading = false;
                state.queue = action.payload;
            })
            .addCase(fetchQueue.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const spotifyQueueReducer = spotifyQueueSlice.reducer;