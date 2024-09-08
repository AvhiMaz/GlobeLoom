import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { Badge } from "./ui/badge";

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

export default Rating;
