import { Navigate } from "react-router-dom"
import { getAccessToken } from "./utils"
import type { ReactNode } from "react"
import GuestLayout from "../layouts/GuestLayout"

export function GuestGuard({ children }: { children: ReactNode }) {
  const accessToken = getAccessToken()

  if (accessToken) {
    console.warn("User is already authenticated, redirecting to dashboard.")
    return <Navigate to="/dashboard" replace />
  }

  return <GuestLayout>{children}</GuestLayout>
}
