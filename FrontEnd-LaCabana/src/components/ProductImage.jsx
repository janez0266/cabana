import React, { useEffect, useState } from "react";
import { AspectRatio, Skeleton } from "@mui/joy";
import ProductTitle from "./ProductTitle";
import { API } from "../api";
import { Buffer } from "buffer";
import "../App.css";

export default function ProductImage(props) {
  const [imageUrl, setImageUrl] = useState(
    "https://via.placeholder.com/200x150"
  );
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    async function getImage() {
      if (props.product) {
        const image = await API.getProductImage(props.product.id);
        setImageUrl(
          image.imagenProducto
            ? URL.createObjectURL(
                new Blob([Buffer.from(image.imagenProducto.data)])
              )
            : "https://via.placeholder.com/200x150"
        );
      }
      setImageLoading(false);
    }
    getImage();
  }, [props.product]);

  return (
    <div className="product">
      <AspectRatio
        sx={{
          width: "300px",
          height: "200px",
          borderRadius: "10px",
        }}
      >
        <Skeleton loading={imageLoading}>
          <img
            src={imageUrl}
            alt={props.product.nombre}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              backgroundColor: "white",
            }}
          />
        </Skeleton>
      </AspectRatio>
      <ProductTitle text={props.product.nombre} loading={props.loading} />
    </div>
  );
}
