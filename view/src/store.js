// src/store.js
import { configureStore, createSlice } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
// import blogReducer from "./features/blog/blogSlice";
// import categoryReducer from "./features/category/categorySlice";

// UI slice (your old state)
const uiSlice = createSlice({
  name: "ui",
  initialState: {
    sidebarShow: true,
    theme: "light",
  },
  reducers: {
    set: (state, action) => {
      Object.assign(state, action.payload); // merge new state into old
    },
  },
});

export const { set } = uiSlice.actions;

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    auth: authReducer,       // for login/register APIs
    // blog: blogReducer,       // for create blog / list blogs APIs
    // category: categoryReducer, // for create category / list categories APIs
  },
});

export default store;
