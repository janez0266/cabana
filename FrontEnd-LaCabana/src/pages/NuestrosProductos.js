import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import SectionTitle from "../components/SectionTitle";
import InfoTitle from "../components/InfoTitle";
import ProductImage from "../components/ProductImage";
import FootpageInfo from "../components/FootpageInfo";
import ProductCard from "../components/ProductCard";
import { API } from "../api";
import { Grid, Button } from "@mui/joy";

export default function NuestrosProductos() {
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [openProductCard, setOpenProductCard] = useState({});

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const data = await API.getProductsByCategory();
      if (data) {
        setProducts(data);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleClickOpen = (productId) => {
    setOpenProductCard((prevState) => ({
      ...prevState,
      [productId]: true,
    }));
  };

  const handleClose = (productId) => {
    setOpenProductCard((prevState) => ({
      ...prevState,
      [productId]: false,
    }));
  };

  return (
    <React.Fragment>
      <NavBar />
      <SectionTitle text="Nuestros Productos" />
      {Object.keys(products).map((key) => (
        <React.Fragment key={key}>
          <InfoTitle text={key} loading={loading} />
          <Grid
            container
            sx={{ margin: "1rem", justifyItems: "center" }}
            justifyContent="center"
            columns={25}
          >
            {products[key].map((product) => (
              <React.Fragment>
                <Grid item xs="auto" sm={10} md={5} key={product.id}>
                  <Button
                    variant="plain"
                    sx={{ padding: "0.10rem" }}
                    size="sm"
                    onClick={() => handleClickOpen(product.id)}
                  >
                    <ProductImage loading={loading} product={product} />
                  </Button>
                </Grid>
                <ProductCard
                  open={openProductCard[product.id] || false}
                  onClose={() => handleClose(product.id)}
                  product={product}
                />
              </React.Fragment>
            ))}
          </Grid>
        </React.Fragment>
      ))}

      <FootpageInfo />
    </React.Fragment>
  );
}
