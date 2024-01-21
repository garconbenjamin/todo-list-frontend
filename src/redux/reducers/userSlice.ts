import { createSlice } from "@reduxjs/toolkit";

export interface UserSliceState {
  id: number | null;
  name: string | null;
  email: string | null;
  groupId: number | null;
  accessToken: string | null;
}

const initialState: UserSliceState = {
  id: null,
  name: null,
  email: null,
  groupId: null,
  accessToken: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return (state = { ...state, ...action.payload });
    },
    clearUser: () => {
      return initialState;
    },
  },
});

export const { actions } = userSlice;
