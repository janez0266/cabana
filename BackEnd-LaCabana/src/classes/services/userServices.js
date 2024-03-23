import { Presentacion, Aplicante, Contacto, Producto } from "../../dbModels.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { UserMapper } from "../mappers/userMapper.js";
import { Op } from "sequelize";

dotenv.config();

export class UserServices {
  consturctor() {}

  static async sendContactMessage(message, reason, email) {
    try {
      const newContact = await Contacto.create({
        mensaje: message,
        motivo_contacto: reason,
        fecha_contacto: new Date(),
      });

      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        requireTLS: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `Nuevo Mensaje - ${
          reason.charAt(0).toUpperCase() + reason.slice(1)
        }`,
        html: `<p>Nuevo Mensaje
        </p><p>Mensaje: ${message}</p><p>Motivo de contacto: ${
          reason.charAt(0).toUpperCase() + reason.slice(1)
        }</p><p>Correo del contactante: ${email}</p>`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      return newContact;
    } catch (error) {
      console.error(error);
      return Promise.reject("Internal server error");
    }
  }

  static async sendApplication(
    nombre,
    apellido,
    correo_electronico,
    cedula,
    mensaje,
    cvPath
  ) {
    try {
      const aplicante = await Aplicante.create({
        nombre,
        apellido,
        correo_electronico,
        cedula: parseInt(cedula),
      });

      const contacto = await Contacto.create({
        mensaje: mensaje,
        motivo_contacto: "postulacion",
        fecha_contacto: new Date(),
        fk_aplicante: aplicante.dataValues.aplicante_id,
      });

      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        requireTLS: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "Postulación Recibida",
        html: `<p>Postulación recibida de parte de ${nombre} ${apellido}.</p>     <p>Mensaje del aplicante: ${mensaje}</p><p>Correo del aplicante: ${correo_electronico}</p>`,
        attachments: cvPath
          ? [
              {
                filename: cvPath.split("/").pop(),
                path: cvPath,
                contentType: "application/pdf", // Specify the content type of the attachment
              },
            ]
          : [],
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
}
