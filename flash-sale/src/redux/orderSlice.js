import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

export const orderStatus = createAsyncThunk("orders/status", async () => {
  const response = await api.get("/user/orders");
  return response.data;
});

const orderSlice = createSlice({
  name: "orders",
  initialState: { items: [], error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(orderStatus.fulfilled, (state, action) => {
      state.items = action.payload.data;
      state.error = null;
    });
    builder.addCase(orderStatus.rejected, (state) => {
      state.items = [];
      state.error = "Failed to fetch order status";
    });
  },
});

export default orderSlice.reducer;
