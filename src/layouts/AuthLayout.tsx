import { createTheme } from "@mui/material/styles"
import DashboardIcon from "@mui/icons-material/Dashboard"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import { AppProvider, type Navigation } from "@toolpad/core/AppProvider"
import { DashboardLayout } from "@toolpad/core/DashboardLayout"
import { Outlet, useLocation, useNavigate } from "react-router-dom"

const NAVIGATION: Navigation = [
  {
    segment: "",
    title: "Home",
    icon: <DashboardIcon />,
  },
  {
    segment: "routes",
    title: "Routes",
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

export default function AuthLayout() {
  const location = useLocation()
  const navigate = useNavigate()

  const router = {
    basename: "/",
    pathname: location.pathname,
    navigate: (path: string) => navigate(path),
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
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </AppProvider>
  )
}
