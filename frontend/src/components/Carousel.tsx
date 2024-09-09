import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CustomCard from "./CustomCard";

const CarouselItemList = [
  {
    img: "/kashmir.jpg",
    title: "Kashmir",
    rating: "4.7",
    location: "Kashmir, India",
  },
  {
    img: "/himachal.jpg",
    title: "Himachal",
    rating: "4.6",
    location: "Himachal, India",
  },
  {
    img: "/rajasthan.jpg",
    title: "Rajasthan",
    rating: "4.2",
    location: "Rajasthan, India",
  },
  {
    img: "/kerala.jpg",
    title: "Kerela",
    rating: "4.9",
    location: "Kerela, India",
  },
  {
    img: "manali.jpg",
    title: "Manali",
    rating: "4.9",
    location: "Manali, India",
  },
  {
    img: "/majuli.jpg",
    title: "Majuli",
    rating: "4.1",
    location: "Majuli, India",
  },
];

const ImageSlider = () => {
  return (
    <div className="py-20">
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
              <CustomCard
                title={item.title}
                img={item.img}
                location={item.location}
                rating={item.rating}
              />
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
