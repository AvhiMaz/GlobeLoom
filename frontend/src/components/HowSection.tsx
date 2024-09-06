import { Bird, Bookmark, Briefcase, MapPin } from "lucide-react";
import BookTripBtn from "./BookTripBtn";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const HowSection = () => {
  return (
    <div className="grid grid-cols-12 py-7 justify-items-center items-center">
      <div className="col-span-6 flex flex-col gap-y-3">
        <h1 className="text-4xl font-semibold">
          How Does <br />
          <span className="text-blue-400">Our Service Work ?</span>
        </h1>
        <p className="text-gray-500 font-medium text-sm">
          What is certain is that <br />
          our service performance is very good and regular
        </p>
        <BookTripBtn text="Get Started" className="mt-5" />
      </div>

      <div className="col-span-6 grid grid-cols-2 gap-4">
        <DetailCard
          Icon={Bookmark}
          title="Book a destination"
          description="Book in advance dont worry its not that complicated"
        />
        <DetailCard
          Icon={Briefcase}
          title="Preparation to go"
          description="We will help you with all your holiday needs"
        />
        <DetailCard
          Icon={MapPin}
          title="Go to destination"
          description="We are with you from the start"
        />
        <DetailCard
          Icon={Bird}
          title="Start your vacation"
          description="If there is something we are always there"
        />
      </div>
    </div>
  );
};
export default HowSection;

const DetailCard = ({
  Icon,
  description,
  title,
}: {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}) => {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <div className="p-3 bg-blue-500 text-white w-fit rounded-lg mb-3">
          <Icon className="w-5 h-5" />
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500 max-w-[200px]">{description}</p>
      </CardContent>
    </Card>
  );
};
