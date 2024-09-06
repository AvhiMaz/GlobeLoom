import { Bird, Bookmark, Briefcase, MapPin } from "lucide-react";
import BookTripBtn from "./BookTripBtn";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Arrow, { DIRECTION } from "react-arrows";

const HowSection = () => {
  return (
    <div className="py-10">
      <div className="overflow-hidden max-w-[1400px]">
        <Arrow
          className="arrow"
          from={{
            direction: DIRECTION.RIGHT,
            node: () => document.getElementById("title_how_section"),
            translation: [0.5, 2],
          }}
          to={{
            direction: DIRECTION.LEFT,
            node: () => document.getElementById("bookmark"),
            translation: [-0.5, -1.5],
          }}
          //   onChange={...}
        />

        <Arrow
          className="arrow"
          from={{
            direction: DIRECTION.TOP,
            node: () => document.getElementById("bookmark"),
            translation: [-0.5, -0.6],
          }}
          to={{
            direction: DIRECTION.RIGHT,
            node: () => document.getElementById("briefcase"),
            translation: [0.7, -1],
          }}
          //   onChange={...}
        />

        <Arrow
          className="arrow"
          from={{
            direction: DIRECTION.LEFT,
            node: () => document.getElementById("briefcase"),
            translation: [0.3, 1],
          }}
          to={{
            direction: DIRECTION.LEFT,
            node: () => document.getElementById("mappin"),
            translation: [-1, -1],
          }}
          //   onChange={...}
        />

        <Arrow
          className="arrow"
          from={{
            direction: DIRECTION.BOTTOM,
            node: () => document.getElementById("mappin"),
            translation: [0.5, 6],
          }}
          to={{
            direction: DIRECTION.BOTTOM,
            node: () => document.getElementById("bird"),
            translation: [1, 5],
          }}
          //   onChange={...}
        />
      </div>

      <div className="grid grid-cols-12 py-7 justify-items-center items-center">
        <div className="col-span-12 md:col-span-6 flex flex-col gap-y-3 items-center md:items-start">
          <h1
            className="text-4xl lg:text-5xl font-semibold text-center md:text-left"
            id="title_how_section"
          >
            How Does <br />
            <span className="text-blue-400">Our Service Work ?</span>
          </h1>
          <p
            className="text-gray-500 font-medium text-sm text-center md:text-left"
            id="para_how_section"
          >
            What is certain is that <br />
            our service performance is very good and regular
          </p>
          <BookTripBtn text="Get Started" className="mt-5" />
        </div>

        <div className="col-span-12 md:col-span-6 grid grid-cols-1 xs:grid-cols-2 gap-4">
          <DetailCard
            id="bookmark"
            Icon={Bookmark}
            title="Book a destination"
            description="Book in advance dont worry its not that complicated"
          />
          <DetailCard
            id="briefcase"
            Icon={Briefcase}
            title="Preparation to go"
            description="We will help you with all your holiday needs"
          />
          <DetailCard
            id="mappin"
            Icon={MapPin}
            title="Go to destination"
            description="We are with you from the start"
          />
          <DetailCard
            id="bird"
            Icon={Bird}
            title="Start your vacation"
            description="If there is something we are always there"
          />
        </div>
      </div>
    </div>
  );
};
export default HowSection;

const DetailCard = ({
  Icon,
  description,
  title,
  id,
}: {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  id: string;
}) => {
  return (
    <Card className="border-0 shadow-lg" id={id}>
      <CardHeader className="flex items-center xs:items-start">
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
