import { createSlice } from '@reduxjs/toolkit';

import { subMenuList } from '@/data/menuData.ts';

import type { PayloadAction } from '@reduxjs/toolkit';

// export interface MenuState  {
//   tickets: {id: number, content: string, path: string }[]
// }
export interface MenuState {
  [key: string]: TicketMenuItem[];
}

export interface TicketMenuItem {
  id: number;
  content: string;
  path: string;
  hide?: boolean;
}

const initialState: MenuState = {
  ...subMenuList,
};

const menu = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenu: (state, action: PayloadAction<string>) => {},
  },
});

export const { setMenu } = menu.actions;
export const menuReducer = menu.reducer;
