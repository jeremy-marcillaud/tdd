import { Ride } from '../models/ride';
import { RideRepository } from './rideRepository';
const { parseISO, getHours } = require('date-fns');

export class RideRepositoryStub implements RideRepository {
  private _rides: Ride[] = [];
  private _duringNighTime = false;

  async save(ride: Ride) {
    this._rides.push(ride);
  }

  async isDuringNightTime(departureDate: string, arrivalDate: string) {
    const departure = parseISO(departureDate);
    const arrival = parseISO(arrivalDate);
    const isWithinTimeRange = (date) => {
      const hour = getHours(date);
      return hour >= 22 || hour < 6;
    };
    return isWithinTimeRange(departure) || isWithinTimeRange(arrival);
  }

  allRides(): Ride[] {
    return this._rides;
  }

  set duringNightTime(value: boolean) {
    this._duringNighTime = value;
  }
}
