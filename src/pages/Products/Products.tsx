import { Box, Grid, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import ProductsFilter from "../../components/ProductsFilter/ProductsFilter";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchGetProducts } from "../../redux/productsSlice";
import { productsSelector } from "../../redux/selectors";
import { Product } from "../../types/products";

const sortingKeys = ["price", "rating"];

const Products = () => {
  const dispatch = useAppDispatch();
  const { products, limit, skip, loading, filterText, sortByKey, sortOrder } =
    useAppSelector(productsSelector);

  const filterRef = useRef<HTMLElement>(null);
  const filterHeight = `${filterRef.current ? filterRef.current?.clientHeight - 16 : 70}px`;

  const filteredProducts = useMemo(() => {
    if (!products) {
      return [];
    }

    if (filterText) {
      return products.filter((item: Product) =>
        item.title.toLowerCase().includes(filterText.toLowerCase())
      );
    }

    return products;
  }, [products, filterText]);

  const sortProducts = useCallback(
    (products: Array<Product>) => {
      if (!products) {
        return [];
      }

      if (sortingKeys.includes(sortByKey)) {
        const sorted = [...products];

        sorted.sort((aItem: Product, bItem: Product) => {
          return aItem[sortByKey] - bItem[sortByKey];
        });

        return sortOrder === "desc" ? sorted.reverse() : sorted;
      }

      return products;
    },
    [sortByKey, sortOrder]
  );

  useEffect(() => {
    if (loading) {
      dispatch(fetchGetProducts({ limit, skip }));
    }
  }, [dispatch, loading, limit, skip]);

  return (
    <Box>
      <ProductsFilter ref={filterRef} />

      <Grid
        container
        spacing={2}
        flexDirection="row"
        justifyContent="center"
        alignItems="flex-start"
        sx={{
          height: `calc(100vh - ${filterHeight})`,
          overflowY: "auto",
        }}
      >
        {products ? (
          products?.length ? (
            sortProducts(filteredProducts).map((item: Product) => (
              <Grid key={item.id} item xs={1} md={4}>
                <ProductCard product={item} />
              </Grid>
            ))
          ) : (
            <Typography>No products</Typography>
          )
        ) : null}
      </Grid>
    </Box>
  );
};

export default Products;
