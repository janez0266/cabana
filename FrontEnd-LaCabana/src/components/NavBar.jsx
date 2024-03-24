import { styled } from "@mui/system";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const RootBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  maxWidth: "xl",
  "& > *": {
    margin: "0.5rem",
  },
});

const CustomIconButton = styled(IconButton)({
  padding: "0.5rem",
});

const CustomButton = styled(Button)({
  padding: "1rem 2rem",
});

export default function NavBar() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleQuienesSomosClick = () => {
    navigate("/seccion/quienes-somos");
  };

  const handleProductosClick = () => {
    navigate("/seccion/nuestros-productos");
  };

  const handleContactanosClick = () => {
    navigate("/seccion/contactanos");
  };

  const handlePostulateClick = () => {
    navigate("/seccion/postulate");
  };

  const handleLoginClick = () => {
    navigate("/seccion/login");
  };

  const handleCompraClick = () => {
    navigate("/seccion/compra");
  };

  return (
    <AppBar position="static" elevation={0} sx={{ backgroundColor: "#0D7377" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <RootBox>
            <CustomIconButton onClick={handleLogoClick}>
              <img
                src={process.env.PUBLIC_URL + "/logo.png"}
                alt="Logo"
                height="85px"
              />
            </CustomIconButton>
            <CustomButton
              sx={{ color: "#fff" }}
              onClick={handleQuienesSomosClick}>
              ¿Quiénes Somos?
            </CustomButton>
            <CustomButton sx={{ color: "#fff" }} onClick={handleProductosClick}>
              Nuestros Productos
            </CustomButton>

            <CustomButton sx={{ color: "#fff" }} onClick={handleCompraClick}>
              Compras
            </CustomButton>
            <CustomButton
              sx={{ color: "#fff" }}
              onClick={handleContactanosClick}
            >
              Contáctanos
            </CustomButton>
            <CustomButton sx={{ color: "#fff" }} onClick={handlePostulateClick}>
              Postúlate
            </CustomButton>
            <CustomButton sx={{ color: "#fff" }} onClick={handleLoginClick}>
              Login
            </CustomButton>

          </RootBox>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
