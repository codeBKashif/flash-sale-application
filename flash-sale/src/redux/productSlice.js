import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

export const getProducts = createAsyncThunk("products/", async () => {
  const response = await api.get("/products");
  return response.data;
});

export const getSaleStatus = createAsyncThunk(
  "sale/status",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/sale/status");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const orderProduct = createAsyncThunk(
  "orders/",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.post("/orders", { productId });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    saleActive: null,
    error: null,
    saleActiveMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.items = action.payload.rows;
      state.error = null;
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.items = [];
    });
    builder.addCase(getSaleStatus.fulfilled, (state, action) => {
      state.saleActive = true;
      state.saleActiveMessage = action.payload.message;
    });
    builder.addCase(getSaleStatus.rejected, (state, action) => {
      state.saleActive = false;
      state.saleActiveMessage = action.payload?.message || "Sale is inactive";
    });
    builder.addCase(orderProduct.fulfilled, (state, action) => {
      state.error = null;
      const orderedProductId = action.payload.order.productId;
      const itemRef = state.items.find((item) => item.id === orderedProductId);
      if (itemRef) {
        itemRef.stock -= 1;
        itemRef.alreadyPurchased = true;
      }
    });
    builder.addCase(orderProduct.rejected, (state, action) => {
      state.error = action.payload?.message || "Failed to place order";
    });
  },
});

export default productSlice.reducer;
