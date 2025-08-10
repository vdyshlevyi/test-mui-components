import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.scss"
import App from "./App.tsx"

import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import { AuthProvider } from "./context/AuthContextProvider.tsx"

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </AuthProvider>,
)
