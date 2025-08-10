import { Routes, Route } from "react-router-dom"
import AuthLayout from "../layouts/AuthLayout"
import HomePage from "./HomePage/HomePage"
import RoutesPage from "./RoutesPage/RoutesPage"
import LoginPage from "./LoginPage/LoginPage"
import NotFoundPage from "./NotFoundPage/NotFound"


export default function AppRoutes() {


  return (
    <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/routes" element={<RoutesPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
  )
}
