import { createBrowserRouter } from "react-router-dom";
import DashBoardLayout from "./layout/Dashboard";
import Home from "./pages/Home";
import Trip from "./pages/Trip";
import HotelsPage from "./pages/hotels";
import FlightList from "./pages/flight";
import { SignUpPage } from "./pages/signUp";
import { LoginPage } from "./pages/Login";

const Router = createBrowserRouter([
  {
    path: "/register",
    element: <SignUpPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "dashboard", // Dashboard layout
    element: <DashBoardLayout />,
    children: [
      {
        path: "trips", // Trips page under dashboard
        index: true,
        element: <Trip />,
      },
      {
        path: "accommodations", // Accommodations page under dashboard
        element: <HotelsPage />,
      },
      {
        path: "transportation", // Transportation page under dashboard
        element: <FlightList />,
      },
      {
        path: "activities", // Activities page under dashboard
        element: <div>Activity Suggestions</div>,
      },
    ],
  },
]);

export default Router;
