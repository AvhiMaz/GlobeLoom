import { useState } from "react";
import axios from "axios";
import { useUserIdStore } from "@/store";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
  budget: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Budget must be a positive number.",
    }),
});

const CreateTrip: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [aiGeneratedContent, setAiGeneratedContent] = useState<string | null>(
    null
  );

  const userId = useUserIdStore((state) => state.userid);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5513/api/trips/", {
        userId: userId,
        name: values.city,
        startDate: values.startDate,
        endDate: values.endDate,
        budget: values.budget,
      });
      setAiGeneratedContent(response.data.aiGeneratedContent);
    } catch (err) {
      setError("Failed to create trip. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: "",
    },
  });

  const preprocessContent = (content: string) => {
    let processedContent = content.replace(/\*+/g, "");
    processedContent = processedContent.replace(/#+/g, "");

    processedContent = processedContent.replace(
      /\*\*(.*?)\*\*/g,
      "<h4>$1</h4>"
    );

    processedContent = processedContent.replace(
      /(?:\r?\n){2,}/g,
      "<br /><br />"
    );

    return processedContent;
  };

  const renderItinerary = (content: string) => {
    const formattedContent = preprocessContent(content);

    return (
      <div className="mt-10 p-6 border border-gray-300 rounded-lg shadow-md">
        <div
          className="prose prose-lg"
          dangerouslySetInnerHTML={{ __html: formattedContent }}
        />
      </div>
    );
  };

  return (
    <div className="grid grid-cols-12 gap-x-4">
      <div className="col-span-12 mb-10">
        <h1 className="text-2xl xs:text-5xl font-semibold text-center mt-7">
          Plan Your Next Trip Now!
        </h1>
      </div>
      <div className="col-span-12 lg:col-span-6 flex items-center justify-center p-4">
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
              <FormField
                control={form.control}
                name="budget"
                disabled={loading}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="In INR" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-center">
                <Button type="submit" disabled={loading} className="w-64">
                  {loading ? "Creating Trip..." : "Create Trip"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
      <div className="col-span-6 bg-map bg-contain bg-center rounded-md hidden lg:block" />
      {aiGeneratedContent && (
        <div className="col-span-12 my-10 xs:my-20">
          <h1 className="text-3xl font-semibold text-center">Trip Details</h1>
          {renderItinerary(aiGeneratedContent)}
        </div>
      )}
    </div>
  );
};

export default CreateTrip;
