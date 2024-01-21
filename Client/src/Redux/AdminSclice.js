import { createSlice } from '@reduxjs/toolkit';

export const AdminAuth = createSlice({
  name: 'Admin',
  initialState: { 
    tempStore : null,
    token : null
  },
  reducers: {
    setTemp: (state, action) => {
    state.tempStore = action.payload;
    },
    clearTemp: (state, action) => {
      state.tempStore = null;
    },
    setUser: (state, action) => {
      state.token = action.payload;
    },
    logout: (state,action)=>{
      state.token = null
    }}
});

export const { setUser ,logout ,setTemp ,clearTemp} = AdminAuth.actions;
export default AdminAuth.reducer;
