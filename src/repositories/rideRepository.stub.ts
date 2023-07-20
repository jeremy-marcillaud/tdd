import { Ride } from '../models/ride';
import { RideRepository } from './rideRepository';

export class RideRepositoryStub implements RideRepository {
  private _rides: Ride[] = [];

  async save(ride: Ride) {
    this._rides.push(ride);
  }

  allRides(): Ride[] {
    return this._rides;
  }
}
