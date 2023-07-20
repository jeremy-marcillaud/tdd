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
    departure: string,
    arrival: string,
    driverType: string,
  ) {
    const distance = await this.rideScannerRepository.calculateDistance(
      departure,
      arrival,
    );

    const isOutsideParis = await this.rideScannerRepository.isOutsideParis(
      arrival,
    );

    const ride = Ride.book(
      id,
      departure,
      arrival,
      driverType,
      distance,
      isOutsideParis,
    );

    return this.rideRepository.save(ride);
  }
}
