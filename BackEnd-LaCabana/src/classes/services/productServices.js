import { Producto, Presentacion } from "../../dbModels.js";
import { Producto as ProductoClass } from "../domain/producto.js";
import { ProductMapper } from "../mappers/productMapper.js";

export class ProductServices {
  constructor() {}

  static async getAllProducts() {
    try {
      const products = await Producto.findAll({
        attributes: [
          "producto_id",
          "nombre_producto",
          "descripcion_producto",
          "categoria",
        ],
      });

      const productList = products.map((prod) => {
        const product = prod.dataValues;

        return new ProductoClass(
          product.producto_id,
          product.nombre_producto,
          product.descripcion_producto,
          null,
          null,
          null,
          product.categoria,
          product.imagen_principal_producto
        );
      });

      return ProductMapper.mapAllProducts(productList);
    } catch (error) {
      console.error(error);
    }
  }

  static async getProductsByCategory() {
    try {
      const productsByCategory = await Producto.findAll({
        attributes: [
          "categoria",
          "producto_id",
          "nombre_producto",
          "descripcion_producto",
        ],
        order: ["categoria"],
      });

      const productList = productsByCategory.map((prod) => {
        const product = prod.dataValues;

        return new ProductoClass(
          product.producto_id,
          product.nombre_producto,
          product.descripcion_producto,
          null,
          null,
          null,
          product.categoria,
          null
        );
      });

      return ProductMapper.mapProductsByCategory(productList);
    } catch (error) {
      console.error(error);
    }
  }

  static async getProductImage(productId) {
    try {
      const product = await Producto.findOne({
        where: { producto_id: productId },
        attributes: ["imagen_principal_producto"],
      });

      const producto = new ProductoClass(
        productId,
        null,
        null,
        null,
        null,
        null,
        null,
        product.imagen_principal_producto
      );

      return ProductMapper.mapProduct(producto);
    } catch (error) {
      console.error(error);
    }
  }

  static async getPresentationImage(presentationId) {
    try {
      const presentation = await Presentacion.findOne({
        where: { presentacion_id: presentationId },
        attributes: ["imagen_presentacion"],
      });

      const presentacion = new ProductoClass(
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        presentation.imagen_presentacion
      );

      return ProductMapper.mapProduct(presentacion);
    } catch (error) {
      console.error(error);
    }
  }

  static async getAllProductsAndPresentations() {
    try {
      const products = await Producto.findAll({
        attributes: ["producto_id", "nombre_producto", "descripcion_producto"],
        include: {
          model: Presentacion,
          attributes: [
            "presentacion_id",
            "tipo_unidad_venta",
            "unidad_venta",
            "precio_unidad_venta",
          ],
        },
      });

      const flattenedList = [];

      products.forEach((product) => {
        product.dataValues.presentaciones.forEach((presentation) => {
          const domainProduct = new ProductoClass(
            product.producto_id,
            product.nombre_producto,
            product.descripcion_producto,
            presentation.unidad_venta,
            presentation.tipo_unidad_venta,
            presentation.precio_unidad_venta,
            null,
            null
          );

          flattenedList.push({
            producto: domainProduct,
            presentacion_id: presentation.presentacion_id,
            imagen_presentacion: null,
          });
        });
      });

      return ProductMapper.mapAllProductsAndPresentations(flattenedList);
    } catch (error) {
      console.error(error);
    }
  }

  static async getProductPresentations(productId) {
    try {
      const product = await Producto.findOne({
        where: { producto_id: productId },
        attributes: ["producto_id"],
        include: {
          model: Presentacion,
          attributes: ["presentacion_id", "tipo_unidad_venta"],
        },
      });

      const flattenedList = [];

      product.dataValues.presentaciones.forEach((presentation) => {
        const domainProduct = new ProductoClass(
          product.producto_id,
          product.nombre_producto,
          product.descripcion_producto,
          presentation.unidad_venta,
          presentation.tipo_unidad_venta,
          presentation.precio_unidad_venta,
          null,
          null
        );

        flattenedList.push({
          producto: domainProduct,
          presentacion_id: presentation.presentacion_id,
          imagen_presentacion: null,
        });
      });

      return ProductMapper.mapProductPresentations(flattenedList);
    } catch (error) {
      console.error(error);
    }
  }
}
