import React, { useState, useEffect } from "react";
import { Typography, Stack, Divider, RadioGroup, Radio } from "@mui/joy";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import FormControlLabel from "@mui/material/FormControlLabel";
import NavBar from "../components/NavBar";
import SectionTitle from "../components/SectionTitle";
import PageTextArea from "../components/PageTextArea";
import PageTextField from "../components/PageTextField";
import PageButton from "../components/PageButton";
import FootpageInfo from "../components/FootpageInfo";
import PageAlert from "../components/PageAlert";
import { API } from "../api";
import "../App.css";

export default function Contactanos() {
  const [selectedValue, setSelectedValue] = useState("reclamo");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleEnviarClick = async () => {
    try {
      await API.sendContactMessage(message, selectedValue, email);
      setShowAlert(true);
    } catch (error) {
      setErrorMessage("Error de servidor");
    }
  };

  useEffect(() => {
    if (selectedValue !== "" && message !== "") {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [selectedValue, message]);

  return (
    <React.Fragment>
      <NavBar />
      <SectionTitle text="Contáctanos" />
      <Typography level="h3" gutterBottom textColor="#0D7377" margin="2rem">
        ¡Queremos conocer tus opiniones!
      </Typography>
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
          <Typography level="h4" gutterBottom textColor="#0D7377" margin="2rem">
            Motivo del Contacto:
          </Typography>
          <RadioGroup
            value={selectedValue}
            onChange={handleChange}
            name="radio-buttons-group"
            sx={{ margin: "2rem" }}
          >
            <FormControlLabel
              value="informacion"
              control={
                <Radio
                  value="informacion"
                  color="default"
                  uncheckedIcon={
                    <RadioButtonUncheckedIcon sx={{ color: "lightgray" }} />
                  }
                  checkedIcon={
                    <RadioButtonCheckedIcon sx={{ color: "#0D7377" }} />
                  }
                  sx={{
                    my: "1rem",
                  }}
                />
              }
              label="Información de Producto"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="sugerencia"
              control={
                <Radio
                  value="sugerencia"
                  color="default"
                  uncheckedIcon={
                    <RadioButtonUncheckedIcon sx={{ color: "lightgray" }} />
                  }
                  checkedIcon={
                    <RadioButtonCheckedIcon sx={{ color: "#0D7377" }} />
                  }
                  sx={{
                    my: "1rem",
                  }}
                />
              }
              label="Sugerencia"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="reclamo"
              control={
                <Radio
                  value="reclamo"
                  color="default"
                  uncheckedIcon={
                    <RadioButtonUncheckedIcon sx={{ color: "lightgray" }} />
                  }
                  checkedIcon={
                    <RadioButtonCheckedIcon sx={{ color: "#0D7377" }} />
                  }
                  sx={{
                    my: "1rem",
                  }}
                />
              }
              label="Reclamo"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </div>
        <div className="item">
          <Typography level="h4" gutterBottom textColor="#0D7377" margin="2rem">
            Escribe un Mensaje:
          </Typography>
          <PageTextArea value={message} onChange={handleMessageChange} />
          <PageTextField
            label="Correo Electrónico"
            placeholder="Correo Electrónico"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
          <div style={{ textAlign: "right" }}>
            <PageButton
              text="Enviar"
              disabled={!isFormValid}
              onClick={handleEnviarClick}
            />
          </div>
          {showAlert && (
            <PageAlert color="success" text="Mensaje enviado correctamente" />
          )}
          {errorMessage && (
            <Typography variant="body2" color="danger" align="center">
              {errorMessage}
            </Typography>
          )}
        </div>
      </Stack>
      <FootpageInfo />
    </React.Fragment>
  );
}
