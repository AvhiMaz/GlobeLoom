import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const BookTripBtn = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => {
  return (
    <Button
      size="lg"
      className={cn("rounded-full w-32 text-[16px]", className)}
    >
      {text}
    </Button>
  );
};

export default BookTripBtn;
