export class Orden {
  constructor(id, statusOrden, fechaOrden) {
    this.id = id;
    this.statusOrden = statusOrden;
    this.fechaOrden = fechaOrden;
    this.productos = [];
  }

  getId() {
    return this.id;
  }

  getStatusOrden() {
    return this.statusOrden;
  }

  setStatusOrden(statusOrden) {
    this.statusOrden = statusOrden;
  }

  getFechaOrden() {
    return this.fechaOrden;
  }

  getProductos() {
    return this.productos;
  }

  setProductos(productos) {
    this.productos = productos;
  }

  setFechaOrden(fechaOrden) {
    this.fechaOrden = fechaOrden;
  }

  agregarProducto(producto) {
    this.productos.push(producto);
  }

  eliminarProducto(producto) {
    const index = this.productos.indexOf(producto);
    if (index > -1) {
      this.productos.splice(index, 1);
    }
  }

  agregarCantidadProducto(producto) {
    const index = this.productos.indexOf(producto);
    if (index > -1) {
      this.productos[index].cantidad++;
    }
  }

  eliminarCantidadProducto(producto) {
    const index = this.productos.indexOf(producto);
    if (index > -1) {
      this.productos[index].cantidad--;
      if (this.productos[index].cantidad === 0) {
        this.eliminarProducto(producto);
      }
    }
  }
}
