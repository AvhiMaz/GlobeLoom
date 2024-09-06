import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

const CreateTrip: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [aiGeneratedContent, setAiGeneratedContent] = useState<string | null>(
    null
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !startDate || !endDate || !budget) {
      setError("Please fill out all fields.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post("http://localhost:5513/api/trips/", {
        userId: "66d9dc68b14f5af7be8041cb",
        name,
        startDate,
        endDate,
        budget,
      });

      setSuccess("Trip created successfully!");
      setAiGeneratedContent(response.data.aiGeneratedContent);
    } catch (err) {
      setError("Failed to create trip. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
    <div className="flex flex-col items-center justify-center p-10 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Create a New Trip</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-md bg-white p-6 border border-gray-300 rounded-lg shadow-md"
      >
        <Input
          placeholder="Trip Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 border rounded-lg"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 border rounded-lg"
        />
        <Input
          placeholder="Budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
        <Button type="submit" disabled={loading} className="mt-4">
          {loading ? "Creating Trip..." : "Create Trip"}
        </Button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-500 mt-4">{success}</p>}

      {aiGeneratedContent && renderItinerary(aiGeneratedContent)}
    </div>
  );
};

export default CreateTrip;
