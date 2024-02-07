import { createSlice } from '@reduxjs/toolkit';

export const CourseSlice = createSlice({
  name: 'Course',
  initialState: { 
        course_data : []
  },
  reducers: {
    setFullData :(state,action)=>{
      state.course_data = action.payload
    }
  },
});

export const { setFullData } = CourseSlice.actions;
export default CourseSlice.reducer;
