export interface Hotel {
  name: string;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
  pricePerNight: number;
  amenities: string[];
  trip?: string;
}
