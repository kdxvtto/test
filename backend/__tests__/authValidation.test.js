import { describe, it, expect } from "@jest/globals"
import { loginSchema, registerSchema } from "../validations/authValidation.js"

describe("authValidation", () => {
  describe("loginSchema", () => {
    it("accepts a valid username and lowercases it", () => {
      const result = loginSchema.safeParse({
        username: "User_123",
        password: "secret12",
      })

      expect(result.success).toBe(true)
      expect(result.data.username).toBe("user_123")
    })

    it("rejects short username", () => {
      const result = loginSchema.safeParse({
        username: "ab",
        password: "secret12",
      })
      expect(result.success).toBe(false)
      expect(result.error.issues[0].message).toMatch(/at least 3/)
    })

    it("rejects password shorter than 6 chars", () => {
      const result = loginSchema.safeParse({
        username: "valid_user",
        password: "123",
      })
      expect(result.success).toBe(false)
      expect(result.error.issues[0].message).toMatch(/at least 6/)
    })
  })

  describe("registerSchema", () => {
    it("accepts valid payload", () => {
      const result = registerSchema.safeParse({
        name: "John Doe",
        username: "john_doe",
        password: "strongPass1",
      })
      expect(result.success).toBe(true)
      expect(result.data.username).toBe("john_doe")
    })

    it("rejects username with invalid chars", () => {
      const result = registerSchema.safeParse({
        name: "John Doe",
        username: "john$doe",
        password: "strongPass1",
      })
      expect(result.success).toBe(false)
      expect(result.error.issues[0].message).toMatch(/letters, numbers, and underscores/)
    })

    it("rejects too-short password", () => {
      const result = registerSchema.safeParse({
        name: "John Doe",
        username: "johndoe",
        password: "123",
      })
      expect(result.success).toBe(false)
      expect(result.error.issues[0].message).toMatch(/at least 6/)
    })
  })
})
