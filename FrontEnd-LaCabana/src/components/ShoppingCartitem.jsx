import React, { useState, useEffect } from "react";
import { ListItem, Divider, Typography, AspectRatio, Skeleton } from "@mui/joy";
import { API } from "../api";
import { Buffer } from "buffer";
import "../App.css";

export default function ShoppingCartItem(props) {
  const [imageUrl, setImageUrl] = useState(
    "https://via.placeholder.com/200x150"
  );
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    async function getImage() {
      if (props.presentation) {
        const image = await API.getPresentationImage(
          props.presentation.presentacion_id
        );
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
  }, [props.presentation]);

  return (
    <React.Fragment>
      <ListItem>
        <AspectRatio
          sx={{
            width: "250px",
            height: "150px",
            borderRadius: "10px",
            objectFit: "cover",
            margin: "0 1rem",
          }}
        >
          <Skeleton loading={imageLoading}>
            <img src={imageUrl} alt="product" />
          </Skeleton>
        </AspectRatio>
        <div>
          <Typography level="h4" gutterBottom textColor="#0D7377" margin="1rem">
            <Skeleton loading={props.loading}>
              {props.presentation.producto}
            </Skeleton>
          </Typography>
          <Typography level="h5" textColor="#0D7377" marginLeft="1rem">
            Precio por Unidad:{" "}
            <Typography level="body-md" textColor="black">
              <Skeleton loading={props.loading}>
                ${API.transformNumber(props.presentation.precio_unidad_venta)}
              </Skeleton>
            </Typography>
          </Typography>
          <Typography level="h5" textColor="#0D7377" marginLeft="1rem">
            Unidad de Venta:{" "}
            <Typography level="body-md" textColor="black">
              <Skeleton loading={props.loading}>
                {props.presentation.tipo_unidad_venta}
              </Skeleton>
            </Typography>
          </Typography>
          <Typography level="h5" textColor="#0D7377" marginLeft="1rem">
            Cantidad por Unidad de Venta:{" "}
            <Typography level="body-md" textColor="black">
              <Skeleton loading={props.loading}>
                {props.presentation.unidad_venta}
              </Skeleton>
            </Typography>
          </Typography>
          <Typography level="h5" textColor="#0D7377" marginLeft="1rem">
            Cantidad de Unidades de Venta:{" "}
            <Typography level="body-md" textColor="black">
              <Skeleton loading={props.loading}>
                {props.presentation.orden_presentaciones.cantidad}
              </Skeleton>
            </Typography>
          </Typography>
          <Typography level="h5" textColor="#0D7377" marginLeft="1rem">
            Precio:{" "}
            <Typography level="body-md" textColor="black">
              <Skeleton loading={props.loading}>
                $
                {API.transformNumber(
                  props.presentation.orden_presentaciones.monto
                )}
              </Skeleton>
            </Typography>
          </Typography>
        </div>
      </ListItem>
      <Divider
        sx={{
          backgroundColor: "#0D7377",
          margin: "1rem",
        }}
        variant="fullWidth"
      />
    </React.Fragment>
  );
}
