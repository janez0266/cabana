import React, { useState, useEffect } from "react";
import { Typography, Stack, Divider } from "@mui/joy";
import NavBar from "../components/NavBar";
import SectionTitle from "../components/SectionTitle";
import PageTextArea from "../components/PageTextArea";
import PageTextField from "../components/PageTextField";
import PageUploadButton from "../components/PageUploadButton";
import PageButton from "../components/PageButton";
import FootpageInfo from "../components/FootpageInfo";
import PageAlert from "../components/PageAlert";
import { API } from "../api";
import "../App.css";

export default function Contactanos() {
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [cedula, setCedula] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [disabledButton, setDisabledButton] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleApellidoChange = (event) => {
    setApellido(event.target.value);
  };

  const handleCedulaChange = (event) => {
    setCedula(event.target.value);
  };

  const handleMensajeChange = (event) => {
    setMensaje(event.target.value);
  };

  const handleFileChange = (file) => {
    setSelectedFile(file);
  };

  const handleClick = () => {
    // Call the API.enApplication method with the form data
    API.sendApplication(nombre, apellido, email, cedula, selectedFile, mensaje);
    setShowAlert(true);
  };

  useEffect(() => {
    const isFormValid =
      email !== "" &&
      nombre !== "" &&
      apellido !== "" &&
      cedula !== "" &&
      selectedFile !== null;
    setDisabledButton(!isFormValid);
  }, [email, nombre, apellido, cedula, selectedFile]);

  return (
    <React.Fragment>
      <NavBar />
      <SectionTitle text="Postúlate" />
      <Typography level="h3" gutterBottom textColor="#0D7377" margin="2rem">
        ¡Forma parte de Lácteos La Cabaña!
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
        <div className="item">
          <Typography level="h4" gutterBottom textColor="#0D7377" margin="2rem">
            Ingresa tus Datos:
          </Typography>
          <PageTextField
            label="Correo Electrónico"
            placeholder="Correo Electrónico"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
          <PageTextField
            label="Nombre"
            placeholder="Nombre"
            type="text"
            value={nombre}
            onChange={handleNombreChange}
          />
          <PageTextField
            label="Apellido"
            placeholder="Apellido"
            type="text"
            value={apellido}
            onChange={handleApellidoChange}
          />
          <PageTextField
            label="Cédula"
            placeholder="Cédula"
            type="number"
            value={cedula}
            onChange={handleCedulaChange}
          />
        </div>
        <div className="item">
          <Typography level="h4" gutterBottom textColor="#0D7377" margin="2rem">
            Escribe un Mensaje:
          </Typography>
          <PageTextArea value={mensaje} onChange={handleMensajeChange} />
        </div>
        <div style={{ textAlign: "center" }}>
          <Typography level="h4" gutterBottom textColor="#0D7377" margin="2rem">
            Carga tu Síntesis Curricular:
          </Typography>
          <PageUploadButton text="Cargar" onFileChange={handleFileChange} />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <PageButton
            type="submit"
            text="Enviar"
            disabled={disabledButton}
            onClick={handleClick}
          />
          {showAlert && (
            <PageAlert
              color="success"
              text="¡Tu solicitud ha sido enviada con éxito!"
            />
          )}
        </div>
      </Stack>
      <FootpageInfo />
    </React.Fragment>
  );
}
