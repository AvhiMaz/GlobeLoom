import { createBrowserRouter } from "react-router-dom";
import DashBoardLayout from "./layout/Dashboard";
import Home from "./pages/Home";
import Trip from "./pages/Trip";
import { DatePicker } from "./pages/Date";
import HotelsPage from "./pages/hotels";
import FlightList from "./pages/flight";

const Router = createBrowserRouter([
  {
    path: "/", // Home path
    element: <Home />,
  },
  {
    path: "dashboard", // Dashboard layout
    element: <DashBoardLayout />,
    children: [
      {
        path: "trips", // Trips page under dashboard
        element: <Trip />,
        children: [
          {
            path: "date-picker", // Nested date picker under trips
            element: <DatePicker />,
          },
        ],
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
