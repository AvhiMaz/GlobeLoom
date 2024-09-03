import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { MapPin, Star } from "lucide-react";

const CarouselItemList = [
  {
    img: "location.avif",
    title: "Forest Wild Life",
    rating: "4.7",
    location: "NRT, Indonesia",
  },
  {
    img: "location.avif",
    title: "Forest Wild Life",
    rating: "4.7",
    location: "NRT, Indonesia",
  },
  {
    img: "location.avif",
    title: "Forest Wild Life",
    rating: "4.7",
    location: "NRT, Indonesia",
  },
  {
    img: "location.avif",
    title: "Forest Wild Life",
    rating: "4.7",
    location: "NRT, Indonesia",
  },
  {
    img: "location.avif",
    title: "Forest Wild Life",
    rating: "4.7",
    location: "NRT, Indonesia",
  },
  {
    img: "location.avif",
    title: "Forest Wild Life",
    rating: "4.7",
    location: "NRT, Indonesia",
  },
];

const ImageSlider = () => {
  return (
    <div>
      <div className="py-4 max-xs:max-w-[230px] flex flex-col items-start gap-y-3 mb-4">
        <h3 className="text-2xl sm:text-4xl font-semibold">
          Popular Destination
        </h3>
        <p className="text-slate-400 sm:text-lg">
          Unleash your wanderlust with GlobeLoom
        </p>
      </div>
      <Carousel className="w-full select-none">
        <CarouselContent>
          {CarouselItemList.map((item, index) => (
            <CarouselItem key={index} className="sm:basis-1/2 md:basis-1/3">
              <Card className="border-0 bg-white shadow-none">
                <CardHeader className="p-0 pb-4">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="rounded-[37px] object-contain"
                  />
                </CardHeader>
                <CardContent className="flex items-center justify-between px-2 md:px-4">
                  <div className="flex flex-col items-start justify-start gap-y-1">
                    <h4 className="text-xl font-semibold">{item.title}</h4>
                    <div className="flex items-center justify-start">
                      <MapPin className="w-4 h-4 mr-1.5 text-gray-400" />
                      <p className="text-gray-400 text-sm font-medium">
                        {item.location}
                      </p>
                    </div>
                  </div>
                  <Rating rating={item.rating} />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-top-5 xs:-top-10 xs:w-12 xs:h-12" />
        <CarouselNext className="-top-5 xs:-top-10 xs:w-12 xs:h-12" />
      </Carousel>
    </div>
  );
};
export default ImageSlider;

const Rating = ({
  rating,
  className = "",
}: {
  rating: string;
  className?: string;
}) => {
  return (
    <Badge className={cn("py-1 bg-blue-500", className)}>
      <Star className="w-4 h-4 mr-1.5" />
      <span className="text-sm">{rating}</span>
    </Badge>
  );
};
