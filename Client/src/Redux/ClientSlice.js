import { createSlice } from '@reduxjs/toolkit';

export const UserAuth = createSlice({
  name: 'Client',
  initialState: { 
    user_id : null,
    user_name : null,
    token : null,
    email : null,
    mobile : null,
    is_purchased : false
  },
  reducers: {
    setUser: (state, action) => {
      state.user_name = action.payload.user_name
      state.user_id = action.payload.user_id
      state.token = action.payload.token
      state.email = action.payload.email
      state.mobile = action.payload.mobile
      state.is_purchased = action.payload.is_purchased
    },
    logout: (state,action)=>{
      state.user_name = null
      state.user_id = null
      state.token = null
      state.email = null
      state.is_purchased = false 
    },
    setPurchase :(state,action)=>{
      state.is_purchased = action.payload.is_purchased
    }
  },
});

export const { setUser ,logout} = UserAuth.actions;
export default UserAuth.reducer;
