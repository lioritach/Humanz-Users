import { createSlice } from "@reduxjs/toolkit";

export const Slice = createSlice({
  name: "usersFields",
  initialState: {
    usersData: null,
    ipData: null,
    status: "idle",
  },
  reducers: {
    getUsers: (state, action) => {
      state.usersData = action.payload;
    },

    getIpData: (state, action) => {
      state.ipData = action.payload;
    },

    addIpData: (state, action) => {
      state.ipData.push(action.payload);
    },

    setStatus: (state, action) => {
      state.status = action.payload;
    },

    deleteUser: (state, action) => {
      state.usersData = state.usersData.filter(
        (arrow) => arrow.id !== action.payload
      );
    },
  },
});

export const {
  getUsers,
  setStatus,
  deleteUser,
  getIpData,
  addIpData,
} = Slice.actions;
export const selectUsersData = (state) => state.usersFields.usersData;
export const selectIpData = (state) => state.usersFields.ipData;
export const selectStatus = (state) => state.usersFields.status;

export default Slice.reducer;
