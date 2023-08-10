import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AvailableTicketsOwnerType } from '@apis/types/schedulesTypes';

interface UserAndMemberState {
  id?: number;
  name?: string;
}

interface findUsersState {
  MEMBER: UserAndMemberState;
  USER: UserAndMemberState;
}

const initialState: findUsersState = {
  MEMBER: {
    id: undefined,
    name: undefined,
  },
  USER: {
    id: undefined,
    name: undefined,
  },
};

export const findUsersSlice = createSlice({
  name: 'findUsers',
  initialState,
  reducers: {
    setFindUser: (state, action: PayloadAction<UserAndMemberState>) => {
      state.USER = action.payload;
    },
    setFindMember: (state, action: PayloadAction<UserAndMemberState>) => {
      state.MEMBER = action.payload;
    },
    clearType: (state, action: PayloadAction<'MEMBER' | 'USER'>) => {
      switch (action.payload) {
        case 'MEMBER':
          state.MEMBER = initialState.MEMBER;
          break;
        case 'USER':
          state.USER = initialState.USER;
          break;
      }
    },
    clearAll: () => initialState,
  },
});

export const { setFindUser, setFindMember, clearAll, clearType } = findUsersSlice.actions;
export const findUsersReducer = findUsersSlice.reducer;
