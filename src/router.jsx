import { createBrowserRouter, Navigate } from "react-router-dom";
import { RouteLayout } from "./layouts/RouteLayout";


/* Routes */

import { ProdErrorPage } from "./pages/ProdErrorPage";
import { stockInfoRoute } from "./pages/StockInfo";


export const router = createBrowserRouter([
  { path: "/", element: <RouteLayout />, children:
    [
      { index: true, element: <Navigate to="/stocks/IBM" />},
      { path: "*", element: <ProdErrorPage /> },
      
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