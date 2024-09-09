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
import CustomCard from "@/components/CustomCard";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(hotels.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > totalPages || pageNumber < 1) {
      return;
    }

    setCurrentPage(pageNumber);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
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
    <>
      <div className="grid grid-cols-12 gap-x-4 bg-hotel bg-right bg-cover h-[600px] relative overflow-y-hidden">
        <div className="custom-shape-divider-top-1725758504 absolute right-[220px] inset-y-0">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
        <div className="col-span-12 lg:col-span-6 flex items-center justify-center relative h-[600px] bg-white p-4">
          <div className="w-full max-w-xl">
            <h1 className="text-2xl xs:text-4xl font-semibold text-center mb-7">
              Search your next Vacation Home!
            </h1>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
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
                        <Input
                          type="date"
                          placeholder="YYYY-MM-DD"
                          {...field}
                        />
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
      </div>

      {hotels.length >= 1 && (
        <div className="p-4">
          <h1 className="text-3xl font-semibold text-center pb-7">
            Available Hotels
          </h1>
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.slice(startIndex, endIndex).map((hotel) => (
              <CustomCard
                key={hotel.id}
                img={hotel.imageUrls[0]}
                location={hotel.location}
                rating={hotel.rating.toString()}
                title={hotel.title}
                reviewCount={hotel.reviewCount.toString()}
              />
            ))}
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className="cursor-pointer select-none disabled:"
                  onClick={() => handlePageChange(currentPage - 1)}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  aria-disabled={currentPage == totalPages}
                  className="cursor-pointer select-none"
                  onClick={() => handlePageChange(currentPage + 1)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  );
};

export default HotelList;
