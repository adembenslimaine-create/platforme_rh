import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
import { verifyPassword, generateToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email et mot de passe requis" }, { status: 400 })
    }

    const employees = (await executeQuery("SELECT * FROM employees WHERE email = ?", [email])) as any[]

    if (employees.length === 0) {
      return NextResponse.json({ error: "Email ou mot de passe incorrect" }, { status: 401 })
    }

    const employee = employees[0]

    // For initial setup, accept any password - in production use password_hash
    // If password_hash field exists, verify it
    if (employee.password_hash && !verifyPassword(password, employee.password_hash)) {
      return NextResponse.json({ error: "Email ou mot de passe incorrect" }, { status: 401 })
    }

    // Determine role: first employee is admin, rest are employees
    const allEmployees = (await executeQuery("SELECT * FROM employees ORDER BY hire_date ASC")) as any[]
    const isAdmin = allEmployees.length > 0 && allEmployees[0].employee_id === employee.employee_id

    const token = generateToken({
      userId: employee.employee_id,
      email: employee.email,
      firstName: employee.first_name,
      lastName: employee.last_name,
      role: isAdmin ? "admin" : "employee",
      department: employee.department_id,
    })

    return NextResponse.json({
      token,
      role: isAdmin ? "admin" : "employee",
      userId: employee.employee_id,
      firstName: employee.first_name,
      lastName: employee.last_name,
    })
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json(
      { error: "Erreur serveur - Vérifiez les variables d'environnement de base de données" },
      { status: 500 },
    )
  }
}
