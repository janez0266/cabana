import { Orden } from "./orden.js";

export class Usuario {
  constructor(id, identificacion, correo, nombreCompleto) {
    this.id = id;
    this.identificacion = identificacion;
    this.correo = correo;
    this.nombreCompleto = nombreCompleto;
    this.ordenes = [];
  }

  getId() {
    return this.id;
  }

  getIdentificacion() {
    return this.identificacion;
  }

  setIdentificacion(identificacion) {
    this.identificacion = identificacion;
  }

  getCorreo() {
    return this.correo;
  }

  setCorreo(correo) {
    this.correo = correo;
  }

  getNombreCompleto() {
    return this.nombreCompleto;
  }

  setNombreCompleto(nombreCompleto) {
    this.nombreCompleto = nombreCompleto;
  }

  crearOrden() {
    const orden = new Orden(this.ordenes.length + 1, "creada", new Date());
    this.ordenes.push(orden);
    return orden;
  }

  enviarOrden(orden) {
    orden.setStatusOrden("enviada");
  }
}
