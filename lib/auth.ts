import crypto from "crypto"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production"

export interface AuthUser {
  userId: number
  email: string
  firstName: string
  lastName: string
  role: "admin" | "employee"
  department?: string
}

export function hashPassword(password: string): string {
  return crypto.pbkdf2Sync(password, "salt", 1000, 64, "sha512").toString("hex")
}

export function verifyPassword(password: string, hash: string): boolean {
  const passwordHash = crypto.pbkdf2Sync(password, "salt", 1000, 64, "sha512").toString("hex")
  return passwordHash === hash
}

export function generateToken(user: AuthUser): string {
  const tokenData = JSON.stringify(user)
  return Buffer.from(tokenData).toString("base64")
}

export function verifyToken(token: string): AuthUser | null {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8")
    return JSON.parse(decoded) as AuthUser
  } catch {
    return null
  }
}
