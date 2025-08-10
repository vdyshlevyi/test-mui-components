import { createTheme } from "@mui/material/styles"
import DashboardIcon from "@mui/icons-material/Dashboard"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import { AppProvider, type Navigation } from "@toolpad/core/AppProvider"
import { DashboardLayout } from "@toolpad/core/DashboardLayout"
import { useLocation, useNavigate } from "react-router-dom"
import type { ReactNode } from "react"

const NAVIGATION: Navigation = [
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "orders",
    title: "Orders",
    icon: <ShoppingCartIcon />,
  },
]

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
})

export default function AuthLayout({ children }: { children: ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()

  const router = {
    basename: "/",
    pathname: location.pathname,
    navigate: (path: string) => navigate(path, { replace: false }),
    prefetch: () => {},
  }

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
        title: "MUI",
        homeUrl: "/",
      }}
      router={router}
      theme={demoTheme}
    >
      <DashboardLayout>{children}</DashboardLayout>
    </AppProvider>
  )
}
