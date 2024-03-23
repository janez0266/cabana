import request from "supertest";
import { app, server } from "../app";

// tests/errorHandling.test.js
describe("Error Handling", () => {
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

  it("should return the correct error response when invalid input data is provided", async () => {
    const response = await request(app)
      .post("/users/sign-in")
      .send({ username: "", password: "password123" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Missing required field");
  });

  it("should return the correct error response when a required field is missing", async () => {
    const response = await request(app)
      .post("/users/sign-in")
      .send({ password: "password123" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Missing required field");
  });
});
