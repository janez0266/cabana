import axios from "axios";
import cookies from "./cookies";

export class API {
  static async helloWorld() {
    try {
      const response = await axios.get(
        `http://${process.env.REACT_APP_SERVER}:3002/`,
        {}
      );

      const { message } = response.data;
      return message;
    } catch (error) {
      console.error(error);
    }
  }

  static async getProductsByCategory() {
    try {
      const response = await axios.get(
        `http://${process.env.REACT_APP_SERVER}:3002/products/by-category`
      );
      const productos = response.data;

      return productos;
    } catch (error) {
      console.error(error);
    }
  }

  static async getProductImage(id) {
    try {
      const response = await axios.get(
        `http://${process.env.REACT_APP_SERVER}:3002/products/${id}/image`
      );
      const image = response.data;

      return image;
    } catch (error) {
      console.error(error);
    }
  }

  static async getPresentationImage(id) {
    try {
      const response = await axios.get(
        `http://${process.env.REACT_APP_SERVER}:3002/products/presentations/${id}`
      );
      const image = response.data;

      return image;
    } catch (error) {
      console.error(error);
    }
  }

  static async getAllProducts() {
    try {
      const response = await axios.get(
        `http://${process.env.REACT_APP_SERVER}:3002/products`
      );
      const productos = response.data;

      return productos;
    } catch (error) {
      console.error(error);
    }
  }

  static async getAllProductsAndPresentations() {
    try {
      const response = await axios.get(
        `http://${process.env.REACT_APP_SERVER}:3002/products/presentations`
      );
      const productos = response.data;

      return productos;
    } catch (error) {
      console.error(error);
    }
  }

  static async getProductPresentations(id) {
    try {
      const response = await axios.get(
        `http://${process.env.REACT_APP_SERVER}:3002/products/${id}/presentations`
      );
      const presentations = response.data;

      return presentations;
    } catch (error) {
      console.error(error);
    }
  }

  static async getDollarRate() {
    try {
      const response = await axios.get(
        `http://${process.env.REACT_APP_SERVER}:3002/dollar-rate`
      );
      const rate = response.data;

      return rate;
    } catch (error) {
      console.error(error);
    }
  }

  static async register(email, password, identificationNumber, name) {
    try {
      const response = await axios.post(
        `http://${process.env.REACT_APP_SERVER}:3002/users/sign-in`,
        {
          email: email,
          password: password,
          identificationNumber: identificationNumber,
          name: name,
        }
      );
      const user = response.data;

      return user;
    } catch (error) {
      console.error(error);
    }
  }

  static async login(email, password) {
    try {
      const response = await axios.post(
        `http://${process.env.REACT_APP_SERVER}:3002/users/authenticate`,
        {
          email: email,
          password: password,
        }
      );
      const user = response.data;

      return user;
    } catch (error) {
      throw error;
    }
  }

  static async updateOrder(orderId, presentations) {
    try {
      const token = cookies.get("token");

      const response = await axios.put(
        `http://${process.env.REACT_APP_SERVER}:3002/orders/${orderId}/update`,
        {
          presentations: presentations,
        },
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );
      const order = response.data;

      return order;
    } catch (error) {
      console.error(error);
    }
  }

  static async sendContactMessage(contactMessage, selectedValue, email) {
    try {
      const response = await axios.post(
        `http://${process.env.REACT_APP_SERVER}:3002/contact`,
        {
          message: contactMessage,
          reason: selectedValue,
          email: email,
        }
      );
      const message = response.data;

      return message;
    } catch (error) {
      console.error(error);
    }
  }

  static async sendApplication(
    name,
    lastName,
    email,
    identificationNumber,
    file,
    mess
  ) {
    try {
      const response = await axios.post(
        `http://${process.env.REACT_APP_SERVER}:3002/applications`,
        {
          nombre: name,
          apellido: lastName,
          correo_electronico: email,
          cedula: identificationNumber,
          cv: file,
          mensaje: mess,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const message = response.data;

      return message;
    } catch (error) {
      console.error(error);
    }
  }

  static async getUserOpenOrder() {
    try {
      const token = cookies.get("token");

      const response = await axios.get(
        `http://${process.env.REACT_APP_SERVER}:3002/users/orders/open`,
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );

      const order = response.data;

      order.presentations.forEach((presentation) => {
        presentation.orden_presentaciones.monto_esp = this.transformNumber(
          parseFloat(presentation.orden_presentaciones.monto)
        );
        presentation.precio_unidad_venta_esp = this.transformNumber(
          parseFloat(presentation.precio_unidad_venta)
        );
      });
      return order;
    } catch (error) {
      console.error(error);
    }
  }

  static async changeOrderStatus(orderId) {
    try {
      const token = cookies.get("token");

      const response = await axios.put(
        `http://${process.env.REACT_APP_SERVER}:3002/orders/${orderId}/status`,
        {},
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );

      const order = response.data;

      return order;
    } catch (error) {
      console.error(error);
    }
  }

  static transformNumber(number) {
    // Convert the number to a string with English format
    let numberString = number.toLocaleString("en", { useGrouping: true });

    // Replace the thousands separator (dot) with a temporary character
    numberString = numberString.replace(/\./g, "#");

    // Replace the decimal separator (comma) with a dot
    numberString = numberString.replace(/\,/g, ".");

    // Replace the temporary character (dot) with a comma
    numberString = numberString.replace(/\#/g, ",");

    return numberString;
  }

  static transformString(string) {
    // Remove any existing thousands separators
    string = string.replace(/\./g, "");

    // Replace the decimal separator with a dot
    string = string.replace(/,/g, ".");

    // Parse the transformed string as a number
    var number = parseFloat(string);

    return number;
  }
}
