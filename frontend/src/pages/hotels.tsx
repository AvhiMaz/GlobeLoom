import React, { useState } from "react";
import axios from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface Hotel {
  id: string;
  title: string;
  location: string;
  rating: number;
  reviewCount: number;
  imageUrls: string[];
}

const formSchema = z.object({
  city: z.string().min(2, {
    message: "City name must be at least 2 characters.",
  }),
  startDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format.",
    })
    .refine((val) => new Date(val) >= new Date(), {
      message: "Cannot select past Dates.",
    }),
  endDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format.",
    })
    .refine((val) => new Date(val) >= new Date(), {
      message: "Cannot select past Dates.",
    }), // can keep a minimum of 1 day
});

const HotelList: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:5513/api/hotels/cities",
        {
          cityName: values.city,
          checkIn: values.startDate,
          checkOut: values.endDate,
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
  }

  return (
    <div className="grid grid-cols-12 gap-x-4 bg-[#387780] p-4">
      <div className="col-span-12 mb-10">
        <h1 className="text-2xl xs:text-5xl font-semibold text-center mt-7 text-white">
          Search your next Vacation Home!
        </h1>
      </div>
      <div className="col-span-12 lg:col-span-6 flex items-center justify-center">
        <div className="w-full max-w-xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="city"
                disabled={loading}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Eg: Mumbai..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startDate"
                disabled={loading}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        type="date"
                        placeholder="YYYY-MM-DD"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                disabled={loading}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input type="date" placeholder="YYYY-MM-DD" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-center">
                <Button type="submit" disabled={loading} className="w-64">
                  {loading ? "Searching..." : "Search Hotels"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>

      <div className="col-span-6 bg-transparent hidden lg:block">
        <img src="/hotel.svg" alt="" />
      </div>

      <div className="col-span-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
