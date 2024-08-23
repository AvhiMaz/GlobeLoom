import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, Outlet, useMatch } from "react-router-dom";

function Trip() {
  const isOnTripsRoot = useMatch("/dashboard/trips");

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <h1>Trip planner</h1>
      {isOnTripsRoot ? (
        <>
          <Input placeholder="Enter destination" />
          <Link to="date-picker">
            <Button>Plan your trip</Button>
          </Link>
        </>
      ) : (
        <p>Pick a Date</p>
      )}
      <Outlet />
    </div>
  );
}

export default Trip;
