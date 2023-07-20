export interface RideScanner {
  calculateDistance(departure: string, arrival: string): Promise<number>;
  isOutsideParis(arrival: string): Promise<boolean>;
}
