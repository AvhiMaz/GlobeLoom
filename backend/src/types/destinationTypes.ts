export interface Destination {
  name: string;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
  attractions: string[];
  trip: string;
}
