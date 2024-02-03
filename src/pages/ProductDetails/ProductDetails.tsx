//import React from "react";
import { Box, Button, CardMedia } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  fetchGetProductById,
  setProduct,
} from "../../redux/productDetailsSlice";
import {
  productDetailsSelector,
  productsSelector,
} from "../../redux/selectors";
import { Product } from "../../types/products";
import NotFound from "../NotFound/NotFound";

const getProductById = (products: Array<Product> | null, productId: number) => {
  if (!products || !productId) {
    return null;
  }

  return products.find((product: Product) => product.id === productId);
};

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { products } = useAppSelector(productsSelector);
  const { productDetails, loading } = useAppSelector(productDetailsSelector);

  const goBackClickHandler = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (products) {
      dispatch(setProduct(getProductById(products, Number(productId))));
    } else {
      dispatch(fetchGetProductById(Number(productId)));
    }
  }, [dispatch, products, productId]);

  if (!productDetails && !loading) {
    return <NotFound />;
  }

  return (
    <Box>
      <Button variant="contained" sx={{ mb: 3 }} onClick={goBackClickHandler}>
        Back to products
      </Button>

      {productDetails ? (
        <Card sx={{ minWidth: 320 }}>
          <CardMedia
            sx={{ height: 340 }}
            image={productDetails.thumbnail}
            title={productDetails.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {productDetails.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {productDetails.description}
            </Typography>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h4">${productDetails.price}</Typography>
              <Typography variant="body2" color="text.secondary">
                {productDetails.rating} of 5
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ) : null}
    </Box>
  );
};

export default ProductDetails;
