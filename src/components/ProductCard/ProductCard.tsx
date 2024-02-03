import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Product } from "../../types/products";
import { Box, CardActionArea, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card sx={{ minWidth: 275, minHeight: 250 }}>
      <CardActionArea component={Link} to={`products/${product.id}`}>
        <CardMedia
          sx={{ height: 140 }}
          image={product.thumbnail}
          title={product.title}
        />
        <CardContent
          sx={{
            minHeight: 152,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexGrow: 1,
          }}
        >
          <Box>
            <Typography gutterBottom variant="h5" component="div">
              {product.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.description.length > 85
                ? `${product.description.slice(0, 85)}...`
                : product.description}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 1,
            }}
          >
            <Typography variant="h5">${product.price}</Typography>
            <Typography variant="body1">{product.rating} of 5</Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
