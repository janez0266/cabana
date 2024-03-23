import React, { useEffect, useState } from "react";
import {
  ListItem,
  Divider,
  Typography,
  IconButton,
  AspectRatio,
  Skeleton,
} from "@mui/joy";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import { API } from "../api";
import { Buffer } from "buffer";
import "../App.css";

export default function ProductListItem(props) {
  const [loadingImage, setLoadingImage] = useState(true);
  const [imageUrl, setImageUrl] = useState(
    "https://via.placeholder.com/200x150"
  );

  useEffect(() => {
    async function getImage() {
      if (props.product) {
        const image = await API.getPresentationImage(
          props.product.presentacion.presentacion_id
        );
        setImageUrl(
          image.imagenProducto
            ? URL.createObjectURL(
                new Blob([Buffer.from(image.imagenProducto.data)])
              )
            : "https://via.placeholder.com/200x150"
        );
      }
      setLoadingImage(false);
    }
    getImage();
  }, [props.product]);

  const handleAdd = () => {
    props.onAdd(props.product.presentacion.presentacion_id);
  };

  const handleRemove = () => {
    props.onRemove(props.product.presentacion.presentacion_id);
  };

  return (
    <React.Fragment>
      <ListItem
        endAction={
          <React.Fragment>
            <IconButton style={{ color: "#0D7377" }} onClick={handleAdd}>
              <AddCircle />
            </IconButton>
            <IconButton style={{ color: "#0D7377" }} onClick={handleRemove}>
              <RemoveCircle />
            </IconButton>
          </React.Fragment>
        }
      >
        <AspectRatio
          sx={{
            width: "200px",
            height: "125px",
            borderRadius: "10px",
            objectFit: "cover",
            margin: "0 1rem",
          }}
        >
          <Skeleton loading={loadingImage}>
            <img src={imageUrl} alt="product" />
          </Skeleton>
        </AspectRatio>
        <div>
          <Typography level="h4" gutterBottom textColor="#0D7377" margin="1rem">
            <Skeleton loading={props.loading}>{props.product.nombre}</Skeleton>
          </Typography>
          <Typography level="h5" textColor="#0D7377" marginLeft="1rem">
            Precio:{" "}
            <Typography level="body-md" textColor="black">
              <Skeleton loading={props.loading}>
                ${API.transformNumber(props.product.precioUnidadVenta)}
              </Skeleton>
            </Typography>
          </Typography>
          <Typography level="h5" textColor="#0D7377" marginLeft="1rem">
            Unidad de Venta:{" "}
            <Typography level="body-md" textColor="black">
              <Skeleton loading={props.loading}>
                {props.product.tipoUnidadVenta}
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
