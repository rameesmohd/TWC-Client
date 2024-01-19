import { createSlice } from '@reduxjs/toolkit';

export const AdminAuth = createSlice({
  name: 'Admin',
  initialState: { 
    token : null
  },
  reducers: {
    setUser: (state, action) => {
      state.token = action.payload.token
    },
    logout: (state,action)=>{
      state.token = null
    }
  }
});

export const { setUser ,logout} = AdminAuth.actions;
export default AdminAuth.reducer;
