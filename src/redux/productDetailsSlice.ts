import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "../types/products";
import { API_SERVER } from "../variables_config";

export interface ProductDetailsState {
  productDetails: Product | null;
  error: string | null;
  loading: boolean;
}

const initialState: ProductDetailsState = {
  productDetails: null,
  error: null,
  loading: true,
};

export const fetchGetProductById = createAsyncThunk(
  "productDetails/fetchGetProductById",
  async (productId: number, { rejectWithValue }) => {
    const response = await fetch(`${API_SERVER}/products/${productId}`);

    if (!response.ok) {
      rejectWithValue(`Could not get product with id ${productId}.`);
    }

    return await response.json();
  }
);

export const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.productDetails = action.payload;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchGetProductById.fulfilled as any, (state, action) => {
      state.productDetails = action.payload;

      state.error = null;
      state.loading = false;
    });

    builder.addCase(fetchGetProductById.rejected as any, (state, action) => {
      if (action?.payload?.message) {
        state.error = action.payload.message;
      } else {
        state.error = "Something went wrong.";
      }

      state.loading = false;
    });
  },
});

export const { setProduct } = productDetailsSlice.actions;

export default productDetailsSlice.reducer;
