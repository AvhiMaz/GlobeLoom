import { useState } from "react";
import ShinyButton from "./ShinyButton";
import { Loader } from "lucide-react";

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      window.location.href = "/dashboard/trips";
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white flex items-center justify-center">
        <div className="text-center">
          <Loader className="spin text-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white">
      <main className="w-full container mx-auto p-6">
        <section className="text-center my-20">
          <div className="mb-6">
            <ShinyButton
              className="rounded-full"
              text="An opensource project"
            ></ShinyButton>
          </div>
          <h2 className="text-4xl lg:text-6xl font-extrabold mb-6">
            Plan Your Next Adventure with GlobeLoom
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Discover amazing places, book the best accommodations, and create
            unforgettable memories.
          </p>
          <a
            onClick={handleButtonClick}
            className="bg-white text-blue-600 px-6 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 transition duration-300 cursor-pointer"
          >
            Begin Your Journey
          </a>
        </section>

        <section id="features" className="my-20">
          <h3 className="text-4xl font-extrabold mb-12 text-center">
            Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="bg-white text-gray-900 p-8 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
              <img
                src="trip-planner.jpg"
                alt="Trip Planner"
                className="rounded-md mb-4"
              />
              <h4 className="text-2xl font-bold mb-4">Trip Planner</h4>
              <p className="text-lg">
                Easily plan your trips with personalized itineraries.
              </p>
            </div>
            <div className="bg-white text-gray-900 p-8 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
              <img
                src="accomodation.jpg"
                alt="Accommodation Finder"
                className="rounded-md mb-4"
              />
              <h4 className="text-2xl font-bold mb-4">Accommodation Finder</h4>
              <p className="text-lg">
                Find the best places to stay, from hotels to vacation rentals.
              </p>
            </div>
            <div className="bg-white text-gray-900 p-8 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
              <img
                src="transport.jpg"
                alt="Transportation Guide"
                className="rounded-md mb-4"
              />
              <h4 className="text-2xl font-bold mb-4">Transportation Guide</h4>
              <p className="text-lg">
                Get detailed transportation options for your journey.
              </p>
            </div>
          </div>
        </section>

        <section id="about" className="my-20">
          <h3 className="text-4xl font-extrabold mb-6 text-center">
            About GlobeLoom
          </h3>
          <p className="text-xl text-gray-200 text-center max-w-3xl mx-auto">
            GlobeLoom is your ultimate travel companion, helping you discover
            new destinations and plan perfect trips.
          </p>
        </section>

        <section id="contact" className="my-20">
          <h3 className="text-4xl font-extrabold mb-6 text-center">
            Contact Us
          </h3>
          <p className="text-xl text-gray-200 text-center max-w-3xl mx-auto">
            Have questions? Feel free to reach out to us at{" "}
            <a
              href="mailto:contact@globeloom.com"
              className="underline hover:text-gray-300 transition duration-300"
            >
              contact@globeloom.com
            </a>
            .
          </p>
        </section>
      </main>
      <footer className="bg-gray-900 text-gray-400 p-6 text-center">
        <p>&copy; 2024 GlobeLoom. All rights reserved.</p>
      </footer>
    </div>
  );
}
