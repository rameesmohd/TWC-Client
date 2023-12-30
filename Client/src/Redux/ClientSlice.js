import { createSlice } from '@reduxjs/toolkit';

export const UserAuth = createSlice({
  name: 'Client',
  initialState: { 
    user_id : null,
    user_name : null,
    token : null,
    email : null,
    is_purchased : false
  },
  reducers: {
    setUser: (state, action) => {
      state.user_name = action.payload.name
      state.user_id = action.payload._id
      state.token = action.payload.token
      state.email = action.payload.email
      state.is_purchased = action.payload.is_purchased
    },
    logout: (state,action)=>{
      state.user_name = null
      state.user_id = null
      state.token = null
      state.email = null
      state.is_purchased = false 
    }
  },
});

export const { setUser ,logout} = UserAuth.actions;
export default UserAuth.reducer;
