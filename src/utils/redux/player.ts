import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface IPlaybackState {
  currentPlayback: {[key: string] : any};
}

const initialState: IPlaybackState = {
  currentPlayback: null,
};

export const playbackSlice = createSlice({
  name: "playbackState",
  initialState,
  reducers: {
    setPlaybackState: (state, action: PayloadAction<object>) => {
      const { currentPlayback } = state;
      
      if (!currentPlayback) {
        state.currentPlayback = action.payload;
      } else {
        const { uri } = currentPlayback;
        if (uri !== action.payload.uri) {
          state.currentPlayback = action.payload;
        }
      }

      return state;
    },
  },
});

export const { setPlaybackState } = playbackSlice.actions;
export const playbackReducer = playbackSlice.reducer;