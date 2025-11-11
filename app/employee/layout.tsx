"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import EmployeeSidebar from "@/components/employee/sidebar"
import EmployeeHeader from "@/components/employee/header"

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const userType = localStorage.getItem("userType")
    if (userType === "admin") {
      router.push("/admin/dashboard")
    }
  }, [router])

  if (!isClient) {
    return null
  }

  return (
    <div className="flex h-screen bg-background">
      <EmployeeSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <EmployeeHeader />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
