import { RootState } from "./store";

export const productsSelector = (state: RootState) => state.products;
export const productDetailsSelector = (state: RootState) =>
  state.productDetails;
