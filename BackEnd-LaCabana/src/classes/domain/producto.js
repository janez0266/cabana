export class Producto {
  constructor(
    id = null,
    nombre = null,
    descripcion = null,
    unidadVenta = null,
    tipoUnidadVenta = null,
    precioUnidadVenta = null,
    categoria = null,
    imagenProducto = null
  ) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.unidadVenta = unidadVenta;
    this.tipoUnidadVenta = tipoUnidadVenta;
    this.precioUnidadVenta = precioUnidadVenta;
    this.categoria = categoria;
    this.imagenProducto = imagenProducto;
  }

  getId() {
    return this.id;
  }

  getNombre() {
    return this.nombre;
  }

  getDescripcion() {
    return this.descripcion;
  }

  getUnidadVenta() {
    return this.unidadVenta;
  }

  setNombre(nombre) {
    this.nombre = nombre;
  }

  setDescripcion(descripcion) {
    this.descripcion = descripcion;
  }

  setUnidadVenta(unidadVenta) {
    this.unidadVenta = unidadVenta;
  }

  getTipoUnidadVenta() {
    return this.tipoUnidadVenta;
  }

  setTipoUnidadVenta(tipoUnidadVenta) {
    this.tipoUnidadVenta = tipoUnidadVenta;
  }

  getPrecioUnidadVenta() {
    return this.precioUnidadVenta;
  }

  setPrecioUnidadVenta(precioUnidadVenta) {
    this.precioUnidadVenta = precioUnidadVenta;
  }

  getImagenProducto() {
    return this.imagenProducto;
  }

  getCategoria() {
    return this.categoria;
  }

  setCategoria(categoria) {
    this.categoria = categoria;
  }

  setImagenProducto(imagenProducto) {
    this.imagenProducto = imagenProducto;
  }
}
