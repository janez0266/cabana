import request from "supertest";
import { app, server } from "../app";
import jwt from "jsonwebtoken";

// tests/authentication.test.js
describe("Authentication", () => {
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

  it("should return the correct response when a user tries to access a protected resource without authorization", async () => {
    // Generate an invalid JSON web token for testing purposes
    const invalidToken = jwt.sign({ userId: "testUser" }, "invalidSecret");

    // Set the Authorization header with the invalid token
    const response = await request(app)
      .get("/users/:userId/orders/open")
      .set("Authorization", `Bearer ${invalidToken}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Unauthorized");
  });
});
