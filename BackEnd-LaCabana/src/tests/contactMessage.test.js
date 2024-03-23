import request from "supertest";
import { app, server } from "../app";
import { Usuario, Contacto } from "../dbModels";
import nodemailer from "nodemailer";

jest.mock("nodemailer");
jest.mock("../dbModels");

describe("POST /users/:userId/contact", () => {
  beforeAll((done) => {
    server.on("listening", () => {
      done();
    });
  });

  afterAll((done) => {
    server.close(() => {
      done();
    });
  });

  it("should send a contact message and return a new contact object", async () => {
    // Mock the user and contact objects
    const mockUser = {
      usuario_id: 1,
      nombre_completo: "John Doe",
    };
    const mockContact = {
      contacto_id: 1,
      mensaje: "Test message",
      motivo_contacto: "sugerencia",
      fecha_contacto: new Date().toISOString(),
      fk_usuario: 1,
    };
    Usuario.findByPk.mockResolvedValue(mockUser);
    Contacto.create.mockImplementation((contact) => {
      return {
        ...contact,
        fk_usuario: parseInt(contact.fk_usuario),
      };
    });
    Contacto.create.mockResolvedValue(mockContact);

    // Mock the email sending
    const mockTransporter = {
      sendMail: jest.fn((mailOptions, callback) => {
        callback(null, { response: "OK" });
      }),
    };
    nodemailer.createTransport.mockReturnValue(mockTransporter);

    // Make the request to the endpoint
    const response = await request(app).post("/users/1/contact").send({
      message: "Test message",
      reason: "sugerencia",
    });

    // Check the response
    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockContact);

    // Check the email sending
    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    expect(mockTransporter.sendMail).toHaveBeenCalledWith(
      {
        from: process.env.EMAIL_USER,
        to: "recipient-email@example.com",
        subject: "Nuevo Mensaje",
        text: `Nuevo Mensaje del Usuario: ${mockUser.nombre_completo}. Mensaje: ${mockContact.mensaje}`,
      },
      expect.any(Function)
    );

    // Check the database insertion
    expect(Usuario.findByPk).toHaveBeenCalledWith("1");
    expect(Contacto.create).toHaveBeenCalledWith({
      mensaje: "Test message",
      motivo_contacto: "sugerencia",
      fecha_contacto: expect.any(Date),
      fk_usuario: "1",
    });
    expect(typeof mockContact.contacto_id).toBe("number");
  });

  it("should return an error if there is an internal server error", async () => {
    // Mock the user and contact objects
    Usuario.findByPk.mockRejectedValue(new Error("Database error"));
    Contacto.create.mockRejectedValue(new Error("Database error"));

    // Make the request to the endpoint
    const response = await request(app).post("/users/1/contact").send({
      message: "Test message",
      reason: "sugerencia",
    });

    // Check the response
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: "Internal server error" });
  });
});
