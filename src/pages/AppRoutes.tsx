import { Routes, Route } from "react-router-dom"
import HomePage from "./HomePage/HomePage"
import RoutesPage from "./RoutesPage/RoutesPage"
import NotFoundPage from "./NotFoundPage/NotFound"
import { AuthGuard } from "../auth/AuthGuard"
import { GuestGuard } from "../auth/GuestGuard"
import DashboardPage from "./DashboardPage/DashboardPage"
import LoginPage from "./LoginPage/LoginPage"
import { getAccessToken, setUser } from "../auth/utils"
import { useCallback, useEffect } from "react"
import { URLS } from "../api/urls"
import { apiClient } from "../api/apiClient"
import type { IUser, UserRole } from "../types/auth"
import type { ILoginResponse } from "../types/responses"

let profileFetched = false

export default function AppRoutes() {
  const fetchProfile = useCallback(async () => {
    if (profileFetched) {
      console.log("Profile already fetched, skipping")
      return
    }

    try {
      console.log("Fetching user profile...")
      const accessToken = getAccessToken()
      if (!accessToken || accessToken === "undefined") {
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
      profileFetched = true
    } catch (err) {
      console.error("Failed to fetch profile:", err)
      // 401 errors are handled automatically by apiClient
    }
  }, [])

  // Load profile on component mount, only if token exists
  useEffect(() => {
    const accessToken = getAccessToken()
    if (accessToken && accessToken !== "undefined") {
      // Then fetch fresh data from server
      fetchProfile()
    } else {
      console.log("No valid access token found, skipping profile fetch")
    }
  }, [fetchProfile])
  return (
    <Routes>
      <Route
        path="/"
        element={
          <GuestGuard>
            <HomePage />
          </GuestGuard>
        }
      />
      <Route
        path="/dashboard"
        element={
          <AuthGuard>
            <DashboardPage />
          </AuthGuard>
        }
      />
      <Route
        path="/routes"
        element={
          <AuthGuard>
            <RoutesPage />
          </AuthGuard>
        }
      />
      <Route
        path="/login"
        element={
          <GuestGuard>
            <LoginPage />
          </GuestGuard>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
