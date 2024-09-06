// src/pages/hotels.tsx
import React, { useState, useEffect } from "react";
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
  const [loading, setLoading] = useState<boolean>(true);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.post(
          "https://globeloom.onrender.com/api/hotels/cities",
          {
            cityName: "San Francisco",
            checkIn: "2024-09-10",
            checkOut: "2024-09-20",
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

    fetchHotels();
  }, []);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Hotel Listings</h1>
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
