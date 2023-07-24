import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TokensState {
  isLogin: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: TokensState = {
  isLogin: false,
  accessToken: null,
  refreshToken: null,
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
    clearTokens: () => initialState,
  },
});

export const { setTokens, clearTokens } = tokensSlice.actions;
export const tokenReducer = tokensSlice.reducer;
