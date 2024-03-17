import { createBrowserRouter } from "react-router-dom";

import { RouteLayout } from "./layouts/RouteLayout";
import { homeRoute } from "./pages/Home";
// import { demoRoute } from "./pages/StockInfo";
import { stockInfoRoute } from "./pages/StockInfo";
import { quantRoute } from "./pages/Quant";
import { dashboardRoute } from "./pages/Dashboard";
import { learnRoute } from "./pages/Learn";
import { articleRoute } from "./pages/Article";

import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  { path: "/", element: <RouteLayout />, children:
    [
      { index: true, ...homeRoute },
      { path: "*", element: <NotFound /> },
      { 
        path: "stocks",
        children: [
          { index: true, ...homeRoute },
          { path: ":symbol", ...stockInfoRoute }
        ]
      },
      { path: "demo", ...stockInfoRoute },
      { path: "quant", ...quantRoute },
      { path: "dashboard", ...dashboardRoute },
      { path: "learn", ...learnRoute },
      { 
        path: "articles",
        children: [
          { 
            path: ":title",  
            children: [
              { index: true, ...articleRoute },
              { path: ":subtitle", ...articleRoute }
            ]
          }
        ]
      }
    ]
  }
])