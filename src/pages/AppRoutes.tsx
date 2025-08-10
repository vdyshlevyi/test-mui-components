import { Routes, Route } from "react-router-dom"
import HomePage from "./HomePage/HomePage"
import NotFoundPage from "./NotFoundPage/NotFound"
import { AuthGuard } from "../auth/AuthGuard"
import { GuestGuard } from "../auth/GuestGuard"
import DashboardPage from "./DashboardPage/DashboardPage"
import LoginPage from "./LoginPage/LoginPage"
import OrdersPage from "./OrdersPage/OrdersPage"

export default function AppRoutes() {
  console.log("<AppRoutes>")
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
        path="/orders"
        element={
          <AuthGuard>
            <OrdersPage />
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
