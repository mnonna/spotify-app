import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ICurrentPlayback {
  uri: string;
  duration_ms: number;
  name?: string;
  album?: {
    uri?: string;
    images?: { url: string }[];
  };
  artists?: { id: string; name: string }[];
}

export interface IPlaybackSnapshot {
  currentPlayback: ICurrentPlayback | null;
  contextUri: string | null;
  isPlaying: boolean;
}

export interface IPlaybackState extends IPlaybackSnapshot {}

const initialState: IPlaybackState = {
  currentPlayback: null,
  contextUri: null,
  isPlaying: false,
};

export const playbackSlice = createSlice({
  name: "playbackState",
  initialState,
  reducers: {
    setPlaybackSnapshot: (state, action: PayloadAction<IPlaybackSnapshot>) => {
      state.currentPlayback = action.payload.currentPlayback;
      state.contextUri = action.payload.contextUri;
      state.isPlaying = action.payload.isPlaying;
    },
  },
});

export const { setPlaybackSnapshot } = playbackSlice.actions;
export const playbackReducer = playbackSlice.reducer;
