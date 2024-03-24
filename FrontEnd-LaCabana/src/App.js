import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import QuienesSomos from "./pages/QuienesSomos";
import Contactanos from "./pages/Contactanos";
import Postulate from "./pages/Postulate";
import NuestrosProductos from "./pages/NuestrosProductos";
import Login from "./pages/Login";
import Compra from "./pages/Compra";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/seccion/quienes-somos" element={<QuienesSomos />} />
        <Route path="/seccion/contactanos" element={<Contactanos />} />
        <Route path="/seccion/postulate" element={<Postulate />} />
        <Route path="/seccion/NuestrosProductos" element={<NuestrosProductos />} />
        <Route path="/seccion/login" element={<Login/>} />
        <Route path="/seccion/Compra" element={<Compra />} />
        <Route
          path="/seccion/nuestros-productos"
          element={<NuestrosProductos />}
        />
        {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
