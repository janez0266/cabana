// tests/validation.test.js
describe("Validation", () => {
  it("should validate that the email address is in the correct format", () => {
    const email = "test@example.com";
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isValidEmail = regex.test(email);

    expect(isValidEmail).toBe(true);
  });

  it("should validate that the input data is not empty", () => {
    const username = "testuser";
    const password = "password123";

    const isDataNotEmpty = username !== "" && password !== "";

    expect(isDataNotEmpty).toBe(true);
  });
});
