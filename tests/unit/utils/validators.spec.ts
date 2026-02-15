import { validateTitle, validateMessage } from "../../../src/utils/validators";

describe("validateTitle", () => {
  it("should return true for 50 characters", () => {
    const title = "a".repeat(50);
    expect(validateTitle(title)).toBe(true);
  });

  it("should return false for 51 characters", () => {
    const title = "a".repeat(51);
    expect(validateTitle(title)).toBe(false);
  });

  it("should return true for empty string", () => {
    expect(validateTitle("")).toBe(true);
  });
});

describe("validateMessage", () => {
  it("should return true for 200 characters", () => {
    const msg = "a".repeat(200);
    expect(validateMessage(msg)).toBe(true);
  });

  it("should return false for 201 characters", () => {
    const msg = "a".repeat(201);
    expect(validateMessage(msg)).toBe(false);
  });

  it("should return false for empty string", () => {
    expect(validateMessage("")).toBe(false);
  });

  it("should return false for whitespace only", () => {
    expect(validateMessage("   ")).toBe(false);
  });

  it("should return true for normal message", () => {
    expect(validateMessage("Hello!")).toBe(true);
  });
});
