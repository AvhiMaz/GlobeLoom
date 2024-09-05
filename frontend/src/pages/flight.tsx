import { useEffect, useState } from "react";
import axios from "axios";

interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  price: string;
  currency: string;
  duration: string;
  nonstop: boolean;
}

const FlightList = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5513/api/flights/search",
          {
            sourceAirportCode: "BOM",
            destinationAirportCode: "DEL",
            date: "2024-10-10",
            itineraryType: "ONE_WAY",
            sortOrder: "ML_BEST_VALUE",
            numAdults: "1",
            numSeniors: "0",
            classOfService: "ECONOMY",
            returnDate: "2024-10-10",
            pageNumber: "1",
            nearby: "yes",
            nonstop: "yes",
            currencyCode: "INR",
            region: "USA",
          }
        );
        setFlights(response.data.flights || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Flight Listings</h1>
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.isArray(flights) && flights.length > 0 ? (
          flights.map((flight) => (
            <div
              key={flight.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-4">
                <h2 className="text-xl font-semibold">
                  {flight.airline} {flight.flightNumber}
                </h2>
                <p className="text-gray-600">
                  {flight.departureTime} - {flight.arrivalTime}
                </p>
                <p className="text-gray-800 text-lg font-bold mt-2">
                  {flight.price} {flight.currency}
                </p>
                <p className="text-gray-600">
                  Duration: {flight.duration} |{" "}
                  {flight.nonstop ? "Nonstop" : "Stopover"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-4">No flights available</div>
        )}
      </div>
    </div>
  );
};

export default FlightList;
