import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { MeType } from '@apis/types/authTypes';

export interface TokensState {
  isLogin: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  user: MeType | null;
}

const initialState: TokensState = {
  isLogin: false,
  accessToken: null,
  refreshToken: null,
  user: null,
};

export const tokensSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isLogin = Boolean(action.payload.accessToken && action.payload.refreshToken);
    },
    setUser: (state, action: PayloadAction<MeType>) => {
      state.user = action.payload;
    },
    clearTokens: () => initialState,
  },
});

export const { setTokens, clearTokens, setUser } = tokensSlice.actions;
export const tokenReducer = tokensSlice.reducer;
