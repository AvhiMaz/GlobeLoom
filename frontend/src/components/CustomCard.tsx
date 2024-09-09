import { MapPin } from "lucide-react";
import { Card, CardHeader, CardContent } from "./ui/card";
import Rating from "./Rating";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import { useState } from "react";
// import AutoScroll from "embla-carousel-auto-scroll";
import Fade from "embla-carousel-fade";

const CustomCard = ({
  images,
  title,
  location,
  rating,
  reviewCount,
}: {
  images: string[] | string;
  title: string;
  location: string;
  rating: string;
  reviewCount?: string;
}) => {
  const [cardHover, setCardHover] = useState(false);

  return (
    <Card
      onMouseEnter={() => setCardHover(true)}
      onMouseLeave={() => setCardHover(false)}
      className="border-0 bg-white shadow-none hover:scale-105 transition-all"
    >
      <CardHeader className="p-0 pb-4">
        {typeof images === "string" && (
          <img
            src={images}
            alt={title}
            className="rounded-[37px] object-contain"
          />
        )}
        {typeof images !== "string" && (
          <Carousel
            plugins={[
              Fade(),
              Autoplay({
                active: cardHover,
                delay: 1500,
              }),
            ]}
            className="w-full select-none transition-all"
          >
            <CarouselContent>
              {images.map((item, index) => (
                <CarouselItem key={index} className="">
                  <img
                    src={item}
                    alt="img"
                    className="rounded-[37px] object-contain"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
      </CardHeader>
      <CardContent className="flex items-center justify-between px-2 md:px-4">
        <div className="flex flex-col items-start justify-start gap-y-1">
          <h4 className="text-xl font-semibold line-clamp-1 max-w-[250px]">
            {title}
          </h4>
          <div className="flex items-center justify-start">
            <MapPin className="w-4 h-4 mr-1.5 text-gray-400" />
            <p className="text-gray-400 text-sm font-medium">{location}</p>
          </div>
        </div>
        {reviewCount && (
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                <Rating rating={rating} />
              </TooltipTrigger>
              <TooltipContent>
                <p>{reviewCount} reviews</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomCard;
