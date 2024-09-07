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
  // const [error, setError] = useState<string | null>(null);
  // const [success, setSuccess] = useState<string | null>(null);
  const [aiGeneratedContent, setAiGeneratedContent] = useState<string | null>(
    null
  );

  const userId = useUserIdStore((state) => state.userid);

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   setLoading(true);
  //   setError(null);
  //   setSuccess(null);

  //   try {
  //     const response = await axios.post("http://localhost:5513/api/trips/", {
  //       userId: userId,
  //       name,
  //       startDate,
  //       endDate,
  //       budget,
  //     });

  //     setSuccess("Trip created successfully!");
  //     setAiGeneratedContent(response.data.aiGeneratedContent);
  //   } catch (err) {
  //     setError("Failed to create trip. Please try again.");
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    setLoading(true);
    // setError(null);
    // setSuccess(null);

    try {
      const response = await axios.post("http://localhost:5513/api/trips/", {
        userId: userId,
        name: values.city,
        startDate: values.startDate,
        endDate: values.endDate,
        budget: values.budget,
      });

      // setSuccess("Trip created successfully!");
      setAiGeneratedContent(response.data.aiGeneratedContent);
    } catch (err) {
      // setError("Failed to create trip. Please try again.");
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
      "<strong>$1</strong>"
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
    // <div className="flex flex-col items-center justify-center p-10 bg-gray-100 min-h-full">
    //   <h1 className="text-2xl font-bold mb-6">Create a New Trip</h1>

    //   <form
    //     onSubmit={handleSubmit}
    //     className="flex flex-col gap-4 w-full max-w-md bg-white p-6 border border-gray-300 rounded-lg shadow-md"
    //   >
    //     <Input
    //       placeholder="Trip Name"
    //       value={name}
    //       onChange={(e) => setName(e.target.value)}
    //     />
    //     <input
    //       type="date"
    //       value={startDate}
    //       onChange={(e) => setStartDate(e.target.value)}
    //       className="p-2 border rounded-lg"
    //     />
    //     <input
    //       type="date"
    //       value={endDate}
    //       onChange={(e) => setEndDate(e.target.value)}
    //       className="p-2 border rounded-lg"
    //     />
    //     <Input
    //       placeholder="Budget"
    //       value={budget}
    //       onChange={(e) => setBudget(e.target.value)}
    //     />
    //     <Button type="submit" disabled={loading} className="mt-4">
    //       {loading ? "Creating Trip..." : "Create Trip"}
    //     </Button>
    //   </form>

    //   {error && <p className="text-red-500 mt-4">{error}</p>}
    //   {success && <p className="text-green-500 mt-4">{success}</p>}

    //   {aiGeneratedContent && renderItinerary(aiGeneratedContent)}
    // </div>
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="city"
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Input type="date" placeholder="YYYY-MM-DD" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
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
          <Button type="submit" disabled={loading}>
            {loading ? "Creating Trip..." : "Create Trip"}
          </Button>
        </form>
      </Form>
      <div>{aiGeneratedContent && renderItinerary(aiGeneratedContent)}</div>
    </div>
  );
};

export default CreateTrip;
