import { BookARide } from './bookAride';
import { Ride } from '../models/ride';
import { RideScannerStub } from '../rideScanner/rideScanner.stub';
import { RideRepositoryStub } from '../repositories/rideRepository.stub';
export const UBER_X_DRIVER = 'Uber_X';
export const STANDARD_DRIVER = 'Standard';

describe('BookARide', () => {
  const anAddressInParis = '9 rue lucien sampaix 75010 Paris';
  const anotherAddressInParis = '41 rue Reaumur 75003 Paris';
  const anotherAdressOutsideParis = '10 avenue Jean Lolive 93500 Patin';
  const rideId = 'abcd';

  let rideRepository: RideRepositoryStub;
  let rideScannerRepository: RideScannerStub;

  beforeEach(async () => {
    rideRepository = new RideRepositoryStub();
    rideScannerRepository = new RideScannerStub();
  });

  it('should book a ride in Paris with no distance in kilometer', async () => {
    await new BookARide(rideRepository, rideScannerRepository).book(
      rideId,
      anAddressInParis,
      anAddressInParis,
      STANDARD_DRIVER,
    );
    expect(rideRepository.allRides()).toEqual([
      new Ride(rideId, anAddressInParis, anAddressInParis, 10, STANDARD_DRIVER),
    ]);
  });

  it('should book a ride in Paris with a distance in kilometer between departure and arrival', async () => {
    rideScannerRepository.distanceInKm = 10;
    await new BookARide(rideRepository, rideScannerRepository).book(
      rideId,
      anAddressInParis,
      anotherAddressInParis,
      STANDARD_DRIVER,
    );
    expect(rideRepository.allRides()).toEqual([
      new Ride(
        rideId,
        anAddressInParis,
        anotherAddressInParis,
        15,
        STANDARD_DRIVER,
      ),
    ]);
  });

  it('should book a ride in Paris with a destination outside Paris', async () => {
    rideScannerRepository.distanceInKm = 10;
    rideScannerRepository.outsideParis = true;
    await new BookARide(rideRepository, rideScannerRepository).book(
      rideId,
      anAddressInParis,
      anotherAdressOutsideParis,
      STANDARD_DRIVER,
    );

    expect(rideRepository.allRides()).toEqual([
      new Ride(
        rideId,
        anAddressInParis,
        anotherAdressOutsideParis,
        35,
        STANDARD_DRIVER,
      ),
    ]);
  });
});
