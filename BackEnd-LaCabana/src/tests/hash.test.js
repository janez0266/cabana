// tests/hashing.test.js
import bcrypt from "bcrypt";

describe("Hashing", () => {
  it("should hash a password correctly", async () => {
    const password = "password123";
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    expect(hashedPassword).toBeDefined();
    expect(hashedPassword).not.toEqual(password);
  });

  it("should compare a password with its hash correctly", async () => {
    const password = "password123";
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const isMatch = await bcrypt.compare(password, hashedPassword);

    expect(isMatch).toBe(true);
  });
});
