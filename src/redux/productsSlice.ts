import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "../types/products";
import { API_SERVER, PRODUCTS_LIMIT } from "../variables_config";

export interface ProductsState {
  products: Array<Product> | null;
  total: number;
  skip: number;
  limit: number;
  filterText: string;
  sortByKey: string;
  sortOrder: string;
  error: string | null;
  loading: boolean;
}

const initialState: ProductsState = {
  products: null,
  total: 0,
  skip: 0,
  limit: PRODUCTS_LIMIT,
  filterText: "",
  sortByKey: "",
  sortOrder: "asc",
  error: null,
  loading: true,
};

export const fetchGetProducts = createAsyncThunk(
  "products/fetchGetProducts",
  async (options: { limit: number; skip?: number }, { rejectWithValue }) => {
    const response = await fetch(
      `${API_SERVER}/products?limit=${options.limit}&skip=${options.skip}`
    );

    if (!response.ok) {
      rejectWithValue("Could not get products.");
    }

    return await response.json();
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilterText: (state, action) => {
      state.filterText = action.payload;
    },
    setSortByKey: (state, action) => {
      state.sortByKey = action.payload;
    },
    changeSortOrder: state => {
      state.sortOrder = state.sortOrder === "asc" ? "desc" : "asc";
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchGetProducts.fulfilled as any, (state, action) => {
      state.products = action.payload.products;
      state.total = action.payload.total;
      state.skip = action.payload.limit;

      state.error = null;
      state.loading = false;
    });

    builder.addCase(fetchGetProducts.rejected as any, (state, action) => {
      if (action?.payload?.message) {
        state.error = action.payload.message;
      } else {
        state.error = "Something went wrong.";
      }

      state.loading = false;
    });
  },
});

export const { setFilterText, setSortByKey, changeSortOrder } =
  productsSlice.actions;

export default productsSlice.reducer;
