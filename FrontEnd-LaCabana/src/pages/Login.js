import React, { useState, useEffect } from "react";
import { Stack, Divider, Typography } from "@mui/joy";
import NavBar from "../components/NavBar";
import PageTextField from "../components/PageTextField";
import PageButton from "../components/PageButton";
import SectionTitle from "../components/SectionTitle";
import FootpageInfo from "../components/FootpageInfo";
import { useNavigate } from "react-router-dom";
import { API } from "../api";
import cookies from "../cookies";

export default function Login() {
  const [email, setEmail] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [identification, setIdentification] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [isSignInDisabled, setIsSignInDisabled] = useState(true);
  const [isLoginDisabled, setIsLoginDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (
      email &&
      password &&
      verifyPassword &&
      identification &&
      name &&
      password === verifyPassword
    ) {
      setIsSignInDisabled(false);
    } else {
      setIsSignInDisabled(true);
    }
  }, [email, password, verifyPassword, identification, name]);

  useEffect(() => {
    if (loginEmail && loginPassword) {
      setIsLoginDisabled(false);
    } else {
      setIsLoginDisabled(true);
    }
  }, [loginEmail, loginPassword]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleLoginEmailChange = (event) => {
    setLoginEmail(event.target.value);
  };

  const handleLoginPasswordChange = (event) => {
    setLoginPassword(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleVerifyPasswordChange = (event) => {
    setVerifyPassword(event.target.value);
    setError(event.target.value !== password);
  };

  const handleIdentificationChange = (event) => {
    setIdentification(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSignInClick = async () => {
    await API.register(email, password, identification, name);
    navigate("/seccion/compra");
  };

  const handleLoginClick = async () => {
    try {
      const token = await API.login(loginEmail, loginPassword);
      cookies.set("token", token.token);
      navigate("/seccion/compra");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("Correo o contraseña incorrectos");
      } else {
        setErrorMessage("Error de servidor");
      }
    }
  };

  return (
    <React.Fragment>
      <NavBar />
      <SectionTitle text="Compra" />
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
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
        <div style={{ width: "30%" }}>
          <Typography level="h4" gutterBottom textColor="#0D7377" margin="2rem">
            Regístrate:
          </Typography>
          <PageTextField
            label="Correo Electrónico"
            placeholder="Correo Electrónico"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
          <PageTextField
            label="Contraseña"
            placeholder="Contraseña"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <PageTextField
            label="Confirmar Contraseña"
            placeholder="Confirmar Contraseña"
            type="password"
            value={verifyPassword}
            onChange={handleVerifyPasswordChange}
            error={error}
          />
          <PageTextField
            label="Identificación"
            placeholder="Identificación"
            type="text"
            value={identification}
            onChange={handleIdentificationChange}
          />
          <PageTextField
            label="Nombre Completo"
            placeholder="Nombre Completo"
            type="text"
            value={name}
            onChange={handleNameChange}
          />
          <div style={{ textAlign: "center" }}>
            <PageButton
              text="Registrarse"
              disabled={isSignInDisabled}
              onClick={handleSignInClick}
            />
          </div>
        </div>
        <div style={{ width: "30%" }}>
          <Typography level="h4" gutterBottom textColor="#0D7377" margin="2rem">
            Inicia Sesión:
          </Typography>
          <PageTextField
            label="Correo Electrónico"
            placeholder="Correo Electrónico"
            type="email"
            value={loginEmail}
            onChange={handleLoginEmailChange}
          />
          <PageTextField
            label="Contraseña"
            placeholder="Contraseña"
            type="password"
            value={loginPassword}
            onChange={handleLoginPasswordChange}
          />
          <div style={{ textAlign: "center" }}>
            <PageButton
              text="Iniciar Sesión"
              disabled={isLoginDisabled}
              onClick={handleLoginClick}
            />
          </div>
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
