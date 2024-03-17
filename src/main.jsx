import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { router } from "./router.jsx"
import "./own-styles.css"
import { AppErrorBoundary } from "./layouts/error-boundaries/AppErrorBoundary.jsx"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
