export interface Trip {
  user?: string;
  name: string;
  startDate: Date;
  endDate: Date;
  destinations: string[];
}
