import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { menuData } from "@/data/menuData.ts";

export interface MenuState  {
    ticketMenu: {id: number, content: string, path: string }[]
}

export interface TicketMenuItem {
  id: number;
  content: string;
  path: string;
}

const initialState: MenuState = {
  ...menuData
} 

const menu = createSlice({
  name: 'menu',
  initialState,
  reducers:{
    setMenu: (state, action : PayloadAction<string>)=>{} 
  } 
})

export const {setMenu} = menu.actions;
export const menuReducer =  menu.reducer;
