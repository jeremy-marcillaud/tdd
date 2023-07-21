import { UBER_X_DRIVER } from '../use-cases/bookARide.spec';
import { KILOMETER_PRICE, STANDARD_PRICE, UBER_X_FEE } from './ride.constant';
// ADD DEPARTURE TIME AND ARRIVAL TIME IN RIDE MODEL
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
    isDuringNightTime: boolean,
  ) {
    return new Ride(
      id,
      departure,
      arrival,
      Ride.calculatePrice(
        distance,
        driverType,
        isOutsideParis,
        isDuringNightTime,
      ),
      driverType,
    );
  }

  static calculatePrice(
    distance,
    driverType,
    isOutsideParis,
    isDuringNightTime,
  ) {
    return (
      STANDARD_PRICE +
      distance * KILOMETER_PRICE +
      (driverType === UBER_X_DRIVER ? UBER_X_FEE : 0) +
      (isOutsideParis ? 20 : 0) +
      (isDuringNightTime ? 2 : 0)
    );
  }
}
