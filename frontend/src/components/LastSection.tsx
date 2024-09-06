import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const LastSection = () => {
  return (
    <div className="grid grid-cols-12 py-20">
      <div className="col-span-12 md:col-span-3 justify-self-center">
        <img
          src="beach.jpg"
          alt="beach"
          className="w-full md:w-64 h-96 object-cover md:object-[-195px] rounded-2xl"
        />
        <DiscountBanner percent="20" date="20 Sept, 2024" />
      </div>
      <div className="col-span-12 md:col-span-9 justify-self-center">
        <div className="py-8 md:py-0 md:h-96 flex flex-col items-start justify-center gap-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl xs:text-5xl lg:text-7xl font-semibold">
              UNLEASH
            </h3>
            <p className="hidden xs:block max-w-[200px] lg:max-w-sm ml-4 font-medium text-sm text-gray-500">
              Traveling in a wonderful way to explore new places and learn about
              different cultures
            </p>
            <p className="block xs:hidden max-w-[200px] lg:max-w-sm ml-2 font-medium text-sm text-gray-500">
              Traveling in a wonderful way
            </p>
          </div>
          <h3 className="w-full text-2xl text-center xs:text-left xs:text-5xl lg:text-7xl font-semibold">
            WANDERLUST WITH
          </h3>
          <div className="flex items-center justify-between">
            <p className="hidden xs:block max-w-[200px] lg:max-w-sm pl-4 font-medium text-sm text-gray-500">
              Traveling in a wonderful way to explore new places and learn about
              different cultures
            </p>
            <p className="block xs:hidden max-w-[200px] lg:max-w-sm pl-4 font-medium text-sm text-gray-500 mr-1.5">
              Traveling in a wonderful way
            </p>
            <h3 className="text-2xl xs:text-5xl lg:text-7xl font-semibold lg:ml-4">
              GLOBELOOM
            </h3>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <BookFlightBtn />
        </div>
      </div>
    </div>
  );
};
export default LastSection;

const DiscountBanner = ({
  percent,
  date,
}: {
  percent: string;
  date: string;
}) => {
  return (
    <div className="flex items-center justify-center gap-x-2 py-4 px-5 bg-gray-50 rounded-lg max-w-full">
      <p className="text-blue-500 text-3xl">{percent}% OFF</p>
      <p className="md:max-w-[90px] text-sm text-gray-400 font-medium">
        Till {date}
      </p>
    </div>
  );
};

const BookFlightBtn = () => {
  return (
    <Button className="w-full md:w-[calc(100%-250px)] bg-blue-200 text-black/75 text-lg xs:text-xl py-3 xs:py-9 hover:text-white/50 transition-all">
      Book a Flight Now <ArrowRight className="ml-3" />
    </Button>
  );
};
