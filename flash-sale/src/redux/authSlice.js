import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

import { setTokenToLocalStorage } from "../utils/HelperFunctions";

export const authenticateUser = createAsyncThunk(
  "auth/token",
  async (payload) => {
    const response = await api.post("/auth/token", payload);
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, isAuthenticated: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authenticateUser.fulfilled, (state, action) => {
      state.token = action.payload.token;
      setTokenToLocalStorage(action.payload.token);
      state.isAuthenticated = true;
    });
    builder.addCase(authenticateUser.rejected, (state) => {
      state.token = null;
      setTokenToLocalStorage(null);
      state.error = "Authentication failed";
      state.isAuthenticated = false;
    });
  },
});

export default authSlice.reducer;
