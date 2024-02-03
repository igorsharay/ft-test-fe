import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const goHomeHandler = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h1">404</Typography>
      <Typography sx={{ mt: 2, mb: 2 }}>Page not found.</Typography>
      <Button variant="contained" sx={{ mb: 3 }} onClick={goHomeHandler}>
        Home
      </Button>
    </Box>
  );
};

export default NotFound;
