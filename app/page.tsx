"use client"
import LoginForm from "@/components/auth/login-form"
import { Toaster } from "sonner"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary via-background to-primary-light flex items-center justify-center p-4">
      <Toaster />
      <LoginForm />
    </main>
  )
}
