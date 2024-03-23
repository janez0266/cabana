import { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Modal,
  ModalClose,
  AspectRatio,
  Skeleton,
} from "@mui/joy";
import { API } from "../api";
import PresentationImage from "./PresentationImage";
import { Buffer } from "buffer";
import "../App.css";

export default function ProductCard(props) {
  const [imageUrl, setImageUrl] = useState(
    "https://via.placeholder.com/200x150"
  );
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const [presentations, setPresentations] = useState([]);

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

  useEffect(() => {
    async function getPresentations() {
      if (props.product) {
        const presentations = await API.getProductPresentations(
          props.product.id
        );
        setPresentations(presentations);
        setLoading(false);
      }
    }
    getPresentations();
  }, [props.product]);

  const handleClose = () => {
    props.onClose(); // Call the onClose prop to change the state of open to false
  };

  return (
    <Modal open={props.open} onClose={handleClose}>
      <Card
        size="lg"
        sx={{
          margin: "5rem",
          marginLeft: "10rem",
          marginRight: "10rem",
          maxHeight: "80vh",
          overflow: "auto",
        }}
      >
        <ModalClose />
        <div className="product-card">
          <AspectRatio
            sx={{
              flex: 1,
              maxWidth: "45%",
              objectFit: "cover",
              borderRadius: "10px",
              aspectRatio: "2/1",
            }}
          >
            <Skeleton loading={imageLoading}>
              <img
                src={imageUrl}
                alt="product"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  backgroundColor: "white",
                }}
              />
            </Skeleton>
          </AspectRatio>
          <div className="product-card-content">
            <Typography
              level="h2"
              gutterBottom
              textColor="#0D7377"
              margin="2rem"
            >
              {props.product.nombre}
            </Typography>
            <Typography
              level="h3"
              gutterBottom
              textColor="#0D7377"
              margin="2rem"
            >
              Descripción
            </Typography>
            <Typography margin="2rem">{props.product.descripcion}</Typography>
          </div>
        </div>
        <Typography level="h3" gutterBottom textColor="#0D7377" margin="2rem">
          Presentaciones
        </Typography>
        <div className="product-presentations">
          {presentations.map((presentation) => (
            <PresentationImage
              key={presentation.id}
              presentation={presentation}
              loading={loading}
            />
          ))}
        </div>
      </Card>
    </Modal>
  );
}
