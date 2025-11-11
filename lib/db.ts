import mysql from "mysql2/promise"

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "hr",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export async function executeQuery(sql: string, values: any[] = []) {
  try {
    const connection = await pool.getConnection()
    const [results] = await connection.execute(sql, values)
    connection.release()
    return results
  } catch (error) {
    console.error("Database error:", error)
    throw new Error("Database query failed")
  }
}

export async function getConnection() {
  return pool.getConnection()
}

// Mock data for development/testing
export const mockEmployeeData = [
  {
    id: 1,
    firstName: "Ahmed",
    lastName: "Ben Ali",
    email: "ahmed.benali@talenhub.tn",
    phone: "+216 98 123 456",
    department: "IT",
    salary: 4500,
    hireDate: "2023-01-15",
  },
  {
    id: 2,
    firstName: "Fatima",
    lastName: "Khlifi",
    email: "fatima.khlifi@talenhub.tn",
    phone: "+216 92 345 678",
    department: "RH",
    salary: 3800,
    hireDate: "2022-06-20",
  },
]

export const mockPayrollData = {
  currency: "TND",
  region: "Tunisia",
}
