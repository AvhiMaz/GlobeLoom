import { MapPin } from "lucide-react";
import { Card, CardHeader, CardContent } from "./ui/card";
import Rating from "./Rating";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const CustomCard = ({
  img,
  title,
  location,
  rating,
  reviewCount,
}: {
  img: string;
  title: string;
  location: string;
  rating: string;
  reviewCount?: string;
}) => {
  return (
    <Card className="border-0 bg-white shadow-none">
      <CardHeader className="p-0 pb-4">
        <img src={img} alt={title} className="rounded-[37px] object-contain" />
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
