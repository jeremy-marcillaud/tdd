import { UBER_X_DRIVER } from '../use-cases/bookARide.spec';

const STANDARD_PRICE = 10;
const KILOMETER_PRICE = 0.5;
const UBER_X_FEE = 5;

export class Ride {
  constructor(
    private id: string,
    private departure: string,
    private arrival: string,
    private price: number,
    private driverType: string,
  ) {}

  static book(
    id: string,
    departure: string,
    arrival: string,
    driverType: string,
    distance: number,
    isOutsideParis: boolean,
  ) {
    return new Ride(
      id,
      departure,
      arrival,
      Ride.calculatePrice(distance, driverType, isOutsideParis),
      driverType,
    );
  }

  static calculatePrice(distance, driverType, isOutsideParis) {
    return (
      STANDARD_PRICE +
      distance * KILOMETER_PRICE +
      (driverType === UBER_X_DRIVER ? UBER_X_FEE : 0) +
      (isOutsideParis ? 20 : 0)
    );
  }
}
