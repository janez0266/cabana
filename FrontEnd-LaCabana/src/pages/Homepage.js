import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import ImageCarousel from "../components/ImageCarousel";
import FootpageInfo from "../components/FootpageInfo";
import ProductImage from "../components/ProductImage";
import { Typography, Grid } from "@mui/joy";
import { API } from "../api";
import "../App.css";

export default function Homepage() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const data = await API.getAllProducts();
      if (data) {
        setProducts(data);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <NavBar />
      <ImageCarousel />
      <Typography level="h2" gutterBottom textColor="#0D7377" margin="2.5rem">
        Nuestros Productos
      </Typography>
      <Grid
        container
        sx={{ margin: "1rem", justifyItems: "center" }}
        justifyContent="center"
        columns="auto"
        spacing={3}
      >
        {products.map((product) => (
          <Grid item xs="auto" sm={10} md={5} key={product.id}>
            <ProductImage loading={loading} product={product} />
          </Grid>
        ))}
      </Grid>
      <FootpageInfo />
    </React.Fragment>
  );
}
