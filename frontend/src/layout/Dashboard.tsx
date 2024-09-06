import {
  // ActivityIcon,
  Bed,
  CircleUser,
  MapIcon,
  Menu,
  Plane,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useUserIdStore } from "@/store";
import { useEffect } from "react";

const DashBoardLayout = () => {
  const userId = useUserIdStore((state) => state.userid);

  //   const token = useTokenStore((state) => state.token);
  //   const removeToken = useTokenStore((state) => state.removeToken);
  const navigate = useNavigate();

  //   const handleLogout = () => {
  //     try {
  //       removeToken();
  //       navigate("/auth/login");
  //       if (config.isDevelopment) {
  //         console.log("User logged out successfully");
  //       }
  //     } catch (error) {
  //       if (config.isDevelopment) {
  //         console.error("Failed to logout:", error);
  //       }
  //     }
  //   };

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
  }, [userId, navigate]);

  if (!userId) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-lightBlue/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-4">
          <div className="flex h-20 items-center px-4 lg:px-6">
            <Link
              to="/"
              className="flex fixed items-center gap-2 font-semibold text-blue"
            >
              <h1>GlobeLoom</h1>
              {/* <Logo width="30" /> */}
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid fixed gap-2 items-start px-4 text-sm font-medium">
              <NavLink
                to="/dashboard/trips"
                className={({ isActive }) => {
                  return `flex items-center gap-3 rounded-lg px-3 py-2 text-lightGray transition-all hover:text-darkBlue ${
                    isActive && "bg-lightBlue"
                  }`;
                }}
              >
                <MapIcon className="h-4 w-4" />
                Trip Planner
              </NavLink>
              <NavLink
                to="/dashboard/accommodations"
                className={({ isActive }) => {
                  return `flex items-center gap-3 rounded-lg px-3 py-2 text-lightGray transition-all hover:text-darkBlue ${
                    isActive && "bg-lightBlue"
                  }`;
                }}
              >
                <Bed className="h-4 w-4" />
                Accommodation Finder
              </NavLink>
              <NavLink
                to="/dashboard/transportation"
                className={({ isActive }) => {
                  return `flex items-center gap-3 rounded-lg px-3 py-2 text-lightGray transition-all hover:text-darkBlue ${
                    isActive && "bg-lightBlue"
                  }`;
                }}
              >
                <Plane className="h-4 w-4" />
                Transportation Guide
              </NavLink>
              {/* <NavLink
                to="/dashboard/activities"
                className={({ isActive }) => {
                  return `flex items-center gap-3 rounded-lg px-3 py-2 text-lightGray transition-all hover:text-darkBlue ${
                    isActive && "bg-lightBlue"
                  }`;
                }}
              >
                <ActivityIcon className="h-4 w-4" />
                Activity Suggestions
              </NavLink> */}
            </nav>
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="flex flex-col">
        <header className="flex h-20 w-full mx-auto items-center gap-4 border-b bg-lightBlue/40 px-4 lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden text-darkBlue border-darkBlue"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              {/* <Logo width="30" className="mb-10" /> */}
              <nav className="grid gap-2 font-medium fox">
                <NavLink
                  to="/dashboard/trips"
                  className={({ isActive }) => {
                    return `flex items-center gap-3 rounded-lg px-3 py-2 text-lightGray transition-all hover:text-darkBlue ${
                      isActive && "bg-lightBlue"
                    }`;
                  }}
                >
                  <MapIcon className="h-4 w-4" />
                  Trip Planner
                </NavLink>
                <NavLink
                  to="/dashboard/accommodations"
                  className={({ isActive }) => {
                    return `flex items-center gap-3 rounded-lg px-3 py-2 text-lightGray transition-all hover:text-darkBlue ${
                      isActive && "bg-lightBlue"
                    }`;
                  }}
                >
                  <Bed className="h-4 w-4" />
                  Accommodation Finder
                </NavLink>
                <NavLink
                  to="/dashboard/transportation"
                  className={({ isActive }) => {
                    return `flex items-center gap-3 rounded-lg px-3 py-2 text-lightGray transition-all hover:text-darkBlue ${
                      isActive && "bg-lightBlue"
                    }`;
                  }}
                >
                  <Plane className="h-4 w-4" />
                  Transportation Guide
                </NavLink>
                {/* <NavLink
                  to="/dashboard/activities"
                  className={({ isActive }) => {
                    return `flex items-center gap-3 rounded-lg px-3 py-2 text-lightGray transition-all hover:text-darkBlue ${
                      isActive && "bg-lightBlue"
                    }`;
                  }}
                >
                  <ActivityIcon className="h-4 w-4" />
                  Activity Suggestions
                </NavLink> */}
              </nav>
            </SheetContent>
          </Sheet>

          <div className="flex w-full justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full bg-lightBlue text-darkBlue hover:bg-darkBlue hover:text-white"
                >
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <Link to="mailto:viralxpost.xyz@gmail.com">
                  <DropdownMenuItem>Support</DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashBoardLayout;
