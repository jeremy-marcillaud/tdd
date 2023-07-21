import { RideRepository } from 'src/repositories/rideRepository';
import { Ride } from '../models/ride';
import { RideScanner } from 'src/rideScanner/rideScanner';

export class BookARide {
  constructor(
    private readonly rideRepository: RideRepository,
    private readonly rideScannerRepository: RideScanner,
  ) {}

  async book(
    id: string,
    departureLocation: string,
    arrivalLocation: string,
    departureTime: string,
    arrivalTime: string,
    driverType: string,
  ) {
    const distance = await this.rideScannerRepository.calculateDistance(
      departureLocation,
      arrivalLocation,
    );

    const isOutsideParis = await this.rideScannerRepository.isOutsideParis(
      arrivalLocation,
    );

    const isDuringNightTime = await this.rideRepository.isDuringNightTime(
      departureTime,
      arrivalTime,
    );

    const ride = Ride.book(
      id,
      departureLocation,
      arrivalLocation,
      driverType,
      distance,
      isOutsideParis,
      isDuringNightTime,
    );

    return this.rideRepository.save(ride);
  }
}
