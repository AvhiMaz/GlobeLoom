import { ArrowRight } from "lucide-react";
import BookTripBtn from "./BookTripBtn";
import { Button } from "./ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Hero = () => {
  return (
    <div className="">
      <div className="bg-hero w-full h-[500px] xs:h-[700px] rounded-[70px] relative">
        <div className="hidden xs:block w-[1200px] absolute -right-[700px] sm:-right-[500px] -bottom-32 sm:bottom-32 rotate-12">
          <img src="airplane.svg" alt="airplane" className="object-contain" />
        </div>

        <div className="absolute left-9 sm:left-28 top-32 ">
          <p className="pl-2">ELEVATE YOUR TRAVEL JOURNEY</p>
          <h1 className="text-5xl sm:text-7xl font-semibold">
            Experience <br /> The Magic Of <br /> Flight!
          </h1>

          <BookTripBtn
            text="Book a trip now"
            className="bg-blue-500 w-40 mt-12 text-sm"
          />
        </div>

        <div className="hidden sm:block absolute -right-10 -bottom-[292px] bg-shape w-[500px] h-[500px] bg-contain bg-no-repeat">
          <div className="absolute left-52 top-6">
            <Button variant="link" className="text-lg">
              Know More <ArrowRight className="ml-4 w-5 h-5" />
            </Button>
          </div>
          <PlacesSection />
        </div>
      </div>
    </div>
  );
};
export default Hero;

const PlacesSection = () => {
  return (
    <div className="absolute top-24 left-28 flex items-center justify-between">
      <div className="flex items-center justify-center">
        <Avatar className="w-16 h-16 border-4 border-white">
          <AvatarImage src="/manali.jpg" alt="place" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <Avatar className="w-16 h-16 border-4 border-white -ml-5">
          <AvatarImage src="kashmir.jpg" alt="place" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <Avatar className="w-16 h-16 border-4 border-white -ml-5">
          <AvatarImage src="kerala.jpg" alt="place" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>

      <div className="ml-5">
        <h3 className="font-semibold text-lg">Awesome Places</h3>
        <p className="text-black/75 leading-5">
          Discover the World One Adventure at a time!
        </p>
      </div>
    </div>
  );
};
