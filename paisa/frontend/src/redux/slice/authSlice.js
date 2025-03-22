import {createSlice} from '@reduxjs/toolkit'
//!Inital state
const userInfo = JSON.parse(localStorage.getItem("userInfo")) || null;

const authSlice=createSlice({
  name:'auth',
  initialState:{
    // post:[],
    // comments:[],
    // post:{}
    user:JSON.parse(localStorage.getItem('userInfo'))||null,
  },
  // reducers:{
  //   loginAction:(state,action)=>{
  //     state.user=action.payload;
      
  //   },
  //   logoutAction:(state,action)=>{
  //     state.user=null;
      
  //   },
  reducers: {
    loginAction: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); // Store user in localStorage
    },
    logoutAction: (state) => {
      state.user = null;
      localStorage.clear(); // Clear storage on logout
    },
  }
  

})
//!Generate actions
export const{loginAction,logoutAction}=authSlice.actions
//!generate reducers
const authReducer=authSlice.reducer;
export default authReducer;