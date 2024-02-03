import { Box, Container } from "@mui/material";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import NotFound from "./pages/NotFound/NotFound";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Products from "./pages/Products/Products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />,
      },
      {
        path: "products/:productId",
        element: <ProductDetails />,
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

function Layout() {
  return (
    <Container sx={{ maxHeight: "100vh", overflow: "hidden" }}>
      <ScrollToTop />
      <Box sx={{ mt: 2 }}>
        <Outlet />
      </Box>
    </Container>
  );
}

export default App;
