import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userID: "",
  data: {},
};

const userData = createSlice({
  name: "user",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setUserID: (state, action) => {
      state.userID = action.payload;
    },
  },
});

export const { setData, setUserID } = userData.actions;

export default userData.reducer;
