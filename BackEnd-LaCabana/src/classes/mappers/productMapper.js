export class ProductMapper {
  static mapProduct(product) {
    return {
      id: product.id,
      nombre: product.nombre,
      descripcion: product.descripcion,
      unidadVenta: product.unidadVenta,
      tipoUnidadVenta: product.tipoUnidadVenta,
      precioUnidadVenta: product.precioUnidadVenta,
      imagenProducto: product.imagenProducto,
      categoria: product.categoria,
    };
  }

  static mapAllProducts(products) {
    return products.map((product) => this.mapProduct(product));
  }

  static mapProductsByCategory(products) {
    const mappedProducts = {};

    products.forEach((product) => {
      if (!mappedProducts[product.categoria]) {
        mappedProducts[product.categoria] = [];
      }

      mappedProducts[product.categoria].push(this.mapProduct(product));
    });

    return mappedProducts;
  }

  static mapAllProductsAndPresentations(products) {
    const mappedProducts = [];

    products.forEach((product) => {
      const mappedProduct = this.mapProduct(product.producto);
      mappedProduct.presentacion = {
        presentacion_id: product.presentacion_id,
        imagen_presentacion: product.imagen_presentacion,
      };

      mappedProducts.push(mappedProduct);
    });

    return mappedProducts;
  }

  static mapProductPresentations(products) {
    const mappedProducts = [];

    products.forEach((product) => {
      const mappedProduct = this.mapProduct(product.producto);
      mappedProduct.presentacion = {
        presentacion_id: product.presentacion_id,
      };

      mappedProducts.push(mappedProduct);
    });

    return mappedProducts;
  }
}
