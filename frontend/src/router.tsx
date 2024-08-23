import { createBrowserRouter } from "react-router-dom";
import DashBoardLayout from "./layout/Dashboard";
import Home from "./pages/Home";
import Trip from "./pages/Trip";
import { DatePicker } from "./pages/Date";

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
        element: <div>Accommodation Finder</div>,
      },
      {
        path: "transportation", // Transportation page under dashboard
        element: <div>Transportation Guide</div>,
      },
      {
        path: "activities", // Activities page under dashboard
        element: <div>Activity Suggestions</div>,
      },
    ],
  },
]);

export default Router;
