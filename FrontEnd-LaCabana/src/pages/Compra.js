import React, { useEffect, useState } from "react";
import { Stack, Divider, List, Typography, Skeleton } from "@mui/joy";
import NavBar from "../components/NavBar";
import SectionTitle from "../components/SectionTitle";
import ProductListItem from "../components/ProductListItem";
import ShoppingCartItem from "../components/ShoppingCartitem";
import InfoTitle from "../components/InfoTitle";
import PageButton from "../components/PageButton";
import FootpageInfo from "../components/FootpageInfo";
import PageAlert from "../components/PageAlert";
import { API } from "../api";
import "../App.css";

export default function Compra() {
  const [dollarRate, setDollarRate] = useState("");
  const [loadingRate, setLoadingRate] = useState(true);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const [loadingOrder, setLoadingOrder] = useState(true);
  const [total, setTotal] = useState("");
  const [totalBs, setTotalBs] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    async function fetchRate() {
      const data = await API.getDollarRate();
      if (data) {
        setDollarRate(data);
        setLoadingRate(false);
      }
    }
    fetchRate();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const data = await API.getAllProductsAndPresentations();
      if (data) {
        setProducts(data);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchUserOpenOrder() {
      const data = await API.getUserOpenOrder();
      if (data) {
        setOrder(data);
        setLoadingOrder(false);
      }
    }
    fetchUserOpenOrder();
  }, []);

  useEffect(() => {
    async function calcTotal() {
      let t = 0;
      if (order.presentations) {
        order.presentations.forEach((presentation) => {
          t += parseFloat(presentation.orden_presentaciones.monto);
        });
      }
      setTotal(API.transformNumber(t));
    }
    async function updateOrder() {
      await API.updateOrder(order.orden_id, order.presentations);
    }
    calcTotal();
    updateOrder();
  }, [order]);

  useEffect(() => {
    async function calcBS() {
      if (dollarRate !== "" && total !== "") {
        const dollar = API.transformString(dollarRate);
        const t = API.transformString(total);
        setTotalBs(API.transformNumber(dollar * t));
      }
    }
    calcBS();
  }, [dollarRate, total]);

  const handleAddToCart = async (presentationId) => {
    const presentation = products.find(
      (product) => product.presentacion.presentacion_id === presentationId
    );
    if (presentation) {
      const existingPresentation = order.presentations.find(
        (p) => p.presentacion_id === presentationId
      );
      if (existingPresentation) {
        // Presentation already exists in the order, update the quantity
        const updatedOrder = order.presentations.map((p) => {
          if (p.presentacion_id === presentationId) {
            return {
              ...p,
              orden_presentaciones: {
                ...p.orden_presentaciones,
                cantidad: p.orden_presentaciones.cantidad + 1,
                monto:
                  parseFloat(p.orden_presentaciones.monto) +
                  parseFloat(presentation.precioUnidadVenta),
              },
            };
          }
          return p;
        });
        setOrder({ ...order, presentations: updatedOrder });
      } else {
        // Presentation doesn't exist in the order, add it as a new presentation
        const newPresentation = {
          presentacion_id: presentation.presentacion.presentacion_id,
          tipo_unidad_venta: presentation.tipoUnidadVenta,
          precio_unidad_venta: presentation.precioUnidadVenta,
          unidad_venta: presentation.unidadVenta,
          fk_producto: presentation.id,
          producto: presentation.nombre,
          orden_presentaciones: {
            cantidad: 1,
            monto: presentation.precioUnidadVenta,
          },
        };
        setOrder({
          ...order,
          presentations: [...order.presentations, newPresentation],
        });
      }
    }
  };

  const handleRemoveFromCart = async (presentationId) => {
    const existingPresentation = order.presentations.find(
      (p) => p.presentacion_id === presentationId
    );
    if (existingPresentation) {
      if (existingPresentation.orden_presentaciones.cantidad > 1) {
        // Presentation quantity is greater than 1, update the quantity
        const updatedOrder = order.presentations.map((p) => {
          if (p.presentacion_id === presentationId) {
            return {
              ...p,
              orden_presentaciones: {
                ...p.orden_presentaciones,
                cantidad: p.orden_presentaciones.cantidad - 1,
                monto:
                  parseFloat(p.orden_presentaciones.monto) -
                  parseFloat(existingPresentation.precio_unidad_venta),
              },
            };
          }
          return p;
        });
        setOrder({ ...order, presentations: updatedOrder });
      } else {
        // Presentation quantity is 1, remove the presentation from the order
        const updatedOrder = order.presentations.filter(
          (p) => p.presentacion_id !== presentationId
        );
        setOrder({ ...order, presentations: updatedOrder });
      }
    }
  };

  const handleOrdeButton = async () => {
    await API.changeOrderStatus(order.orden_id);
    setOrder([]);
    setShowFeedback(true);
  };

  return (
    <React.Fragment>
      <NavBar />
      <SectionTitle text="Compra" />
      <Stack
        direction="row"
        justifyContent="space-evenly"
        divider={
          <Divider
            sx={{
              backgroundColor: "#0D7377",
              margin: "0.5rem",
            }}
            variant="fullWidth"
            orientation="vertical"
          />
        }
      >
        <div>
          <InfoTitle text="Productos" loading={false} />
          <div className="product-list">
            <List>
              {products.map((product) => (
                <ProductListItem
                  key={product.presentacion.presentacion_id}
                  loading={loading}
                  product={product}
                  onAdd={handleAddToCart}
                  onRemove={handleRemoveFromCart}
                />
              ))}
            </List>
          </div>
        </div>
        <div>
          <InfoTitle text="Carrito de Compras" loading={false} />
          <div className="shopping-cart-list">
            <List>
              {order.presentations
                ? order.presentations.map((presentation) => (
                    <ShoppingCartItem
                      loading={loadingOrder}
                      presentation={presentation}
                    />
                  ))
                : null}
            </List>
          </div>
        </div>
        <div className="order-summary">
          <InfoTitle text="Resumen de Compra" loading={false} />
          <Typography level="h5" textColor="#0D7377" marginLeft="1rem">
            Total:{" "}
            <Typography level="body-md" textColor="black">
              ${total}
            </Typography>
          </Typography>
          <Typography level="h5" textColor="#0D7377" marginLeft="1rem">
            Tasa:{" "}
            <Typography level="body-md" textColor="black">
              <Skeleton loading={loadingRate}>
                {dollarRate.slice(1, 6)} Bs.
              </Skeleton>
            </Typography>
          </Typography>
          <Typography level="h5" textColor="#0D7377" marginLeft="1rem">
            Total Bs.:{" "}
            <Typography level="body-md" textColor="black">
              {totalBs} Bs.
            </Typography>
          </Typography>
          <PageButton text="Ordenar" onClick={handleOrdeButton} />
          {showFeedback ? (
            <PageAlert
              color="success"
              text="¡Orden realizada con éxito! Será contactado a la brevedad posible para organizar el envío y pago."
              onClose={() => setShowFeedback(false)}
            />
          ) : null}
        </div>
      </Stack>
      <FootpageInfo />
    </React.Fragment>
  );
}
