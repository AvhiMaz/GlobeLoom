import React, { useState } from "react";
import axios from "axios";

interface Hotel {
  id: string;
  title: string;
  location: string;
  rating: number;
  reviewCount: number;
  imageUrls: string[];
}

const HotelList: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // State for form inputs
  const [city, setCity] = useState<string>("");
  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");

  const fetchHotels = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:5513/api/hotels/cities",
        {
          cityName: city,
          checkIn: checkIn,
          checkOut: checkOut,
          pageNumber: 1,
          currencyCode: "USD",
        }
      );
      setHotels(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city && checkIn && checkOut) {
      fetchHotels();
    } else {
      setError("Please fill in all fields.");
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Find Hotels</h1>

      {/* Form for user input */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="date"
            placeholder="Check-in"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="date"
            placeholder="Check-out"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
        <div className="w-full flex items-center justify-center">
          {" "}
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Search Hotels
          </button>
        </div>
      </form>

      {loading && <div className="text-center p-4">Loading...</div>}
      {error && <div className="text-center p-4 text-red-500">{error}</div>}

      {/* Hotel Listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={hotel.imageUrls[0]}
              alt={hotel.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{hotel.title}</h2>
              <p className="text-gray-600">{hotel.location}</p>
              <div className="flex items-center mt-2">
                <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-sm">
                  {hotel.rating} ★
                </span>
                <span className="ml-2 text-gray-600">
                  ({hotel.reviewCount} reviews)
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelList;
