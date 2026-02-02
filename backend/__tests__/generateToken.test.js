import { describe, it, expect, beforeEach } from "@jest/globals"
import jwt from "jsonwebtoken"
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js"

beforeEach(() => {
  process.env.JWT_SECRET = "test-jwt-secret"
  process.env.JWT_REFRESH_SECRET = "test-jwt-refresh-secret"
})

describe("generateToken utilities", () => {
  it("generates an access token with 1h TTL", () => {
    const token = generateAccessToken({ id: "123", username: "tester" })
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    expect(decoded.id).toBe("123")
    expect(decoded.username).toBe("tester")

    const ttl = decoded.exp - decoded.iat
    expect(ttl).toBeGreaterThanOrEqual(3500)
    expect(ttl).toBeLessThanOrEqual(3605)
  })

  it("generates a refresh token with 7d TTL", () => {
    const token = generateRefreshToken({ id: "123", username: "tester" })
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET)

    const ttl = decoded.exp - decoded.iat
    expect(ttl).toBeGreaterThanOrEqual(7 * 24 * 3600 - 100)
    expect(ttl).toBeLessThanOrEqual(7 * 24 * 3600 + 100)
  })
})
