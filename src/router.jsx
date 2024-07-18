import { createBrowserRouter, Navigate } from "react-router-dom";
import { RouteLayout } from "./layouts/RouteLayout";


/* Routes */

import { NotFound } from "./pages/NotFound";
import { stockInfoRoute } from "./pages/StockInfo";


export const router = createBrowserRouter([
  { path: "/", element: <RouteLayout />, children:
    [
      { index: true, element: <Navigate to="/stocks/IBM" />},
      { path: "*", element: <NotFound /> },
      
      { 
        path: "stocks",
        children: [
          { index: true, element: <Navigate to="/stocks/IBM" />},
          { path: ":symbol", ...stockInfoRoute }
        ]
      },
    ]
  }
])