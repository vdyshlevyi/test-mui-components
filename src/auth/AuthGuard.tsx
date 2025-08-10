import { Navigate, useLocation } from "react-router-dom"
import { useCallback, useEffect, type ReactNode } from "react"
import AuthLayout from "../layouts/AuthLayout.tsx"
import { URLS } from "../api/urls"
import { apiClient } from "../api/apiClient"
import type { IUser, UserRole } from "../types/auth"
import type { ILoginResponse } from "../types/responses"
import { getAccessToken, setUser } from "./utils.ts"

export const AuthGuard = ({ children }: { children: ReactNode }) => {
  console.log("<AuthGuard>")
  const location = useLocation()

  const fetchProfile = useCallback(async () => {
    try {
      console.log("Fetching user profile...")
      const accessToken = getAccessToken()
      if (!accessToken) {
        console.warn("No access token found in fetchProfile")
        return
      }

      const responseJson = await apiClient.get<ILoginResponse>(
        URLS.auth.profile,
      )
      const newUser: IUser = {
        id: responseJson.id,
        first_name: responseJson.first_name,
        last_name: responseJson.last_name,
        email: responseJson.email,
        role: responseJson.role as UserRole,
      }
      // Update user in state and localStorage
      setUser(newUser)
      console.log("Profile fetched successfully:", newUser)
    } catch (err) {
      console.error("Failed to fetch profile:", err)
      // 401 errors are handled automatically by apiClient
    }
  }, [])

  // Load profile on component mount AND on route change
  useEffect(() => {
    const accessToken = getAccessToken()
    if (accessToken) {
      // Then fetch fresh data from server
      fetchProfile()
    } else {
      console.log("No valid access token found, skipping profile fetch")
    }
  }, [fetchProfile, location.pathname]) // Added location.pathname dependency

  // If no token, redirect to login page
  const accessToken = getAccessToken()
  if (!accessToken) {
    console.warn("No access token found, redirecting to login.")
    return <Navigate to="/" replace />
  }

  // If token exists, render the children components
  return <AuthLayout>{children}</AuthLayout>
}
